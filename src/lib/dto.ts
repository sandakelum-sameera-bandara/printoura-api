import type { 
    Category as PrismaCategory, 
    Service as PrismaService,
} from '../generated/prisma/client.js'


export type serviceDTO = {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    shortDescription: string | null;
    description: string | null;
    pricingType: string;
    basePrice: unknown;
    pricingUnit: string | null;
    imageUrl: string | null;
    isFeatured: boolean;
    isActive: boolean;
    sortOrder: number;
    optionConfig: unknown;};


export type categoryDTO = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    services: serviceDTO[]
};

export function toServiceDTO(
    service: PrismaService
): serviceDTO {
    return {
        id: service.id,
        categoryId: service.categoryId,
        name: service.name,
        slug: service.slug,
        shortDescription: service.shortDescription,
        description: service.description,
        pricingType: service.pricingType,
        basePrice: service.basePrice,
        pricingUnit: service.pricingUnit,
        imageUrl: service.imageUrl,
        isFeatured: service.isFeatured,
        isActive: service.isActive,
        sortOrder: service.sortOrder,
        optionConfig: service.optionConfig,
       };
}


export function toCategoryDTO(category: PrismaCategory & { services?: PrismaService[] }): categoryDTO{
    return{
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.imageUrl,
        services: category.services?.map(toServiceDTO) ?? [],
    };
}