import { Router } from 'express'
import { createCategorySchema, type createCategoryInput } from '../schemas/category.js';
import { validateBody } from '../middleware/validate.js';
import { logger } from '../lib/logger.js';
import { Errors } from '../lib/errors.js';
import { createServiceSchema, type createServiceInput } from '../schemas/service.js';

export const categoriesRouter: Router = Router()

const CATEGORIES = [    
    {
        id: "c-01",
        title: "Printed Materials",
        availables: "Leaflets, Bookmarks, Flyers, Tuts, Tags & Labels",
        image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
    },
        {
        id: "c-02",
        title: "Finishing Services",
        availables: "",
        image: "https://images.unsplash.com/photo-1575204149651-c188bc0f2e6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGxhbWluYXRpbmclMjAlMjYlMjBiaW5kaW5nfGVufDB8fDB8fHww"
    },
    {
        id: "c-03",
        title: "Signage & Display",
        availables: "",
        image: "https://printair.lk/storage/products/1/images/gW0yAQcqd6w35zZ4RSLlwNywGcuEont3j4DEc1aD.jpg"
    },
    {
        id: "c-04",
        title: "Stamp & T-Shirt Printing",
        availables: "",
        image: "https://storeus.mumfordandsons.com/cdn/shop/files/evergreen-stamp-blue.png?v=1780419188"
    },
    {
        id: "c-05",
        title: "Photo Frames",
        availables: "",
        image: "https://cms.cloudinary.vpsvc.com/image/upload/if_ar_gt_1.1/c_scale,t_pdpHeroGallery_Gallery/if_else/c_scale,w_816/if_end/f_auto,q_auto:best,dpr_1.0/india%20lob/photo%20frames/in_photo-with-frame_001.jpg"
    },
    {
        id: "c-06",
        title: "Design & Digital Services",
        availables: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbl3e5PA34LoTkOMcGU49_15l0tLlwEUwD8g8kNuntYQ&s=10.jpg"
    },
    {
        id: "c-07",
        title: "Gift Items",
        availables: "",
        image: "https://www.allrecipes.com/thmb/UNuNa3bslnqK3blFk7xorXok1Xc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Food20Gifts20Photo20by20Mackenzie20Schieck20650x20464-a796a8cb2c6442ffb8329f7c6a105278.jpg"
    },
    {
        id: "c-08",
        title: "",
        availables: "",
        image: ""
    }

];

categoriesRouter.get('/', (_req, res) => {
    res.json(CATEGORIES)
})

categoriesRouter.get('/:id', (req, res) => {
    const Category = CATEGORIES.find(c => c.id === req.params.id)
    if(!Category){
        res.status(404).json({ error: 'Category not found' });
        return;
    }
    res.json(Category);
})

categoriesRouter.post('/', validateBody(createCategorySchema), (req, res) => {
    const newCategory = req.body as createCategoryInput;
    logger.info(newCategory.id)
    CATEGORIES.push(newCategory);
    res
    .status(201)
    .location(`${req.baseUrl}/${newCategory.id}`)
    .json(newCategory);
})

categoriesRouter.delete('/:id', (req, res) => {
    const index = CATEGORIES.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        res.status(404).json({ error: 'Category not found' });
        return;
    }
    CATEGORIES.splice(index, 1);
    res.status(204).send();
})

const SERVICES = [
  {
    id: "s-01",
    categoryID: "c-01",
    title: "Leaflets & Flyers",
    description: "Eye-catching promotional prints for businesses, events, products, and special offers.",
    options: "",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s-02",
    categoryID: "c-01",
    title: "Tute Covers & File Covers",
    description: "Durable and attractive covers for tuition materials, files, and educational documents.",
    options: "Available options: A4, A5 and custom sizes • Single or double-sided • Full colour or black & white • Matte, glossy or standard paper • Various GSM options.",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s-03",
    categoryID: "c-01",
    title: "Tute & Class Cards",
    description: "Professional cards for promoting tuition classes, schedules, courses, and contact details.",
    options: "Available options: Custom sizes • Single or double-sided • Full colour or black & white • Matte or glossy paper • Various GSM options.",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s-04",
    categoryID: "c-01",
    title: "Business Cards",
    description: "Professional business cards to showcase your brand, contact details, and services.",
    options: "Available options: Standard and custom sizes • Single or double-sided • Full colour or black & white • Matte, glossy or premium paper • Various GSM options.",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s-05",
    categoryID: "c-01",
    title: "Tags, Labels & Day Cards",
    description: "Custom printed tags and labels for products, packaging, pricing, and promotions.",
    options: "Available options: Custom sizes and shapes • Single or double-sided • Full colour or black & white • Standard, matte or glossy paper • Various GSM options.",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s-06",
    categoryID: "c-01",
    title: "Pocket Calendars",
    description: "Compact, practical calendars customized with your brand and contact details.",
    options: "Available options: Pocket-size formats • Single or double-sided • Full colour or black & white • Matte, glossy or standard paper • Various GSM options.",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s-07",
    categoryID: "c-01",
    title: "Loyalty Cards & Wesak Cards",
    description: "Beautifully printed cards for customer rewards, greetings, and special occasions.",
    options: "Available options: Standard and custom sizes • Single or double-sided • Full colour or black & white • Matte, glossy or premium paper • Various GSM options.",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s-08",
    categoryID: "c-01",
    title: "Posters & Bill Books",
    description: "Vibrant posters for promotion and practical bill books for everyday business use",
    options: "Available options: A4, A3 and custom poster sizes • Single or double-sided • Full colour or black & white • Different paper materials and GSM options • Custom bill-book formats and quantities.",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "s-09",
    categoryID: "c-01",
    title: "Lunch Boxes",
    description: "Custom-printed lunch boxes that make your food packaging attractive and brand-focused.",
    options: "Available options: Custom box sizes • Custom printed designs • Single or multiple-colour printing • Suitable packaging materials • Custom quantities and finishes.",
    image: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxwcmludGllZCUyMGl0ZW1zJTIwbGVhZmxldHMlMkMlMjBib29rbWFya3MlMkMlMjBmbHllcnMlMkMlMjB0dXRzJTJDJTIwdGFncyUyMCUyNiUyMGxhYmVsc3xlbnwwfHwwfHx8MA%3D%3D"
  },
   
]

categoriesRouter.get('/:id/services', (req, res) => {
    const category = CATEGORIES.find(c => c.id === req.params.id)
    if(!category){
        throw Errors.notFound('Category')
    }
    res.json(SERVICES.filter(s => s.categoryID === req.params.id))
})

categoriesRouter.post('/:id/services', validateBody(createServiceSchema), (req, res) => {
    const newService = req.body as createServiceInput;
    const categoryID = req.params.id;
    if(!categoryID || typeof categoryID === 'object'){
        throw Errors.validation('Invalid Category ID');
    }
    SERVICES.push({
        ...newService,
        categoryID
    });
    res
    .status(201)
    .location(`${req.baseUrl}/${newService.id}`)
    .json(newService)
})