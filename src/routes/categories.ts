import { Router } from 'express'
import { categoryIdSchema, createCategorySchema, type createCategoryInput } from '../schemas/category.js';
import { validateBody } from '../middleware/validate.js';
import { Errors } from '../lib/errors.js';
import { createServiceSchema, type createServiceInput } from '../schemas/service.js';
import { prisma } from '../lib/prisma.js';
import { toCategoryDTO } from '../lib/dto.js';

export const categoriesRouter: Router = Router()

categoriesRouter.get('/', async (_req, res, next) => {
    try{
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: { services: true }
        })
        res.json(categories.map(toCategoryDTO));
    }catch (err){
        next(err)
    }
})

categoriesRouter.get('/', async(_req, res, next) => {
    try{
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: { 
                services: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' } 
                }
            }
        })
        res.json(categories.map(toCategoryDTO));

        }catch(err){
            next(err)
    }
})

categoriesRouter.get('/:id', async (req, res, next) => {
    try{
        
        const result = categoryIdSchema.safeParse(req.params.id); 
        if (!result.success) { 
            throw Errors.validation('Invalid Category ID'); 
        } 
        const category = await prisma.category.findUnique({ 
            where: { 
                id: result.data, 
            }, 
        }); 
        if (!category) { 
            throw Errors.notFound('Category'); 
        } 
        res.json(toCategoryDTO(category)); 
    } catch (err) { 
        next(err); 
    } 
});

categoriesRouter.get('/:id', async (req, res, next) => {
    try {
        const result = categoryIdSchema.safeParse(req.params.id);

        if (!result.success) {
            throw Errors.validation('Invalid Category ID');
        }

        const category = await prisma.category.findUnique({
            where: {
                id: result.data,
            },
            include: {
                services: {
                    where: {
                        isActive: true,
                    },
                    orderBy: {
                        sortOrder: 'asc',
                    },
                },
            },
        });

        if (!category) {
            throw Errors.notFound('Category');
        }

        res.json(toCategoryDTO(category));
    } catch (err) {
        next(err);
    }
});


categoriesRouter.post('/', validateBody(createCategorySchema), async(req, res, next) => {
    try{
        const data = req.body as createCategoryInput; 
        
        const newCategory = await prisma.category.create({ 
            data, 
        }); 
        res .status(201) 
        .location(`${req.baseUrl}/${newCategory.id}`) 
        .json(toCategoryDTO(newCategory)); 
    } catch (err) { 
        next(err); 
    } 
} );

categoriesRouter.delete('/:id', async (req, res, next) => {
    try{
        const result = categoryIdSchema.safeParse(req.params.id); 
        if (!result.success) { 
            throw Errors.validation('Invalid Category ID'); 
        } 
        const category = await prisma.category.findUnique({ 
            where: { id: result.data, 

            }, 
        }); 
        if (!category) { 
            throw Errors.notFound('Category'); 
        } 
        await prisma.category.delete({ 
            where: { 
                id: result.data, 
            }, 
        }); 
        res.status(204).send(); 
    } catch (err) { 
        next(err); 
    } 
});

//     const index = CATEGORIES.findIndex(c => c.id === req.params.id);
//     if (index === -1) {
//         res.status(404).json({ error: 'Category not found' });
//         return;
//     }
//     CATEGORIES.splice(index, 1);
//     res.status(204).send();
// })

// const SERVICES = [
//   {
//     id: "s-01",
//     categoryID: "c-01",
//     title: "Leaflets & Flyers",
//     description: "Eye-catching promotional prints for businesses, events, products, and special offers.",
//     options: "",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: "s-02",
//     categoryID: "c-01",
//     title: "Tute Covers & File Covers",
//     description: "Durable and attractive covers for tuition materials, files, and educational documents.",
//     options: "Available options: A4, A5 and custom sizes • Single or double-sided • Full colour or black & white • Matte, glossy or standard paper • Various GSM options.",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: "s-03",
//     categoryID: "c-01",
//     title: "Tute & Class Cards",
//     description: "Professional cards for promoting tuition classes, schedules, courses, and contact details.",
//     options: "Available options: Custom sizes • Single or double-sided • Full colour or black & white • Matte or glossy paper • Various GSM options.",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: "s-04",
//     categoryID: "c-01",
//     title: "Business Cards",
//     description: "Professional business cards to showcase your brand, contact details, and services.",
//     options: "Available options: Standard and custom sizes • Single or double-sided • Full colour or black & white • Matte, glossy or premium paper • Various GSM options.",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: "s-05",
//     categoryID: "c-01",
//     title: "Tags, Labels & Day Cards",
//     description: "Custom printed tags and labels for products, packaging, pricing, and promotions.",
//     options: "Available options: Custom sizes and shapes • Single or double-sided • Full colour or black & white • Standard, matte or glossy paper • Various GSM options.",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: "s-06",
//     categoryID: "c-01",
//     title: "Pocket Calendars",
//     description: "Compact, practical calendars customized with your brand and contact details.",
//     options: "Available options: Pocket-size formats • Single or double-sided • Full colour or black & white • Matte, glossy or standard paper • Various GSM options.",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: "s-07",
//     categoryID: "c-01",
//     title: "Loyalty Cards & Wesak Cards",
//     description: "Beautifully printed cards for customer rewards, greetings, and special occasions.",
//     options: "Available options: Standard and custom sizes • Single or double-sided • Full colour or black & white • Matte, glossy or premium paper • Various GSM options.",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: "s-08",
//     categoryID: "c-01",
//     title: "Posters & Bill Books",
//     description: "Vibrant posters for promotion and practical bill books for everyday business use",
//     options: "Available options: A4, A3 and custom poster sizes • Single or double-sided • Full colour or black & white • Different paper materials and GSM options • Custom bill-book formats and quantities.",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     id: "s-09",
//     categoryID: "c-01",
//     title: "Lunch Boxes",
//     description: "Custom-printed lunch boxes that make your food packaging attractive and brand-focused.",
//     options: "Available options: Custom box sizes • Custom printed designs • Single or multiple-colour printing • Suitable packaging materials • Custom quantities and finishes.",
//     image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
//   },
   
// ]

// categoriesRouter.get('/:id/services', (req, res) => {
//     const category = CATEGORIES.find(c => c.id === req.params.id)
//     if(!category){
//         throw Errors.notFound('Category')
//     }
//     res.json(SERVICES.filter(s => s.categoryID === req.params.id))
// })

// categoriesRouter.post('/:id/services', validateBody(createServiceSchema), (req, res) => {
//     const newService = req.body as createServiceInput;
//     const categoryID = req.params.id;
//     if(!categoryID || typeof categoryID === 'object'){
//         throw Errors.validation('Invalid Category ID');
//     }
//     SERVICES.push({
//         ...newService,
//         categoryID
//     });
//     res
//     .status(201)
//     .location(`${req.baseUrl}/${newService.id}`)
//     .json(newService)
// })
