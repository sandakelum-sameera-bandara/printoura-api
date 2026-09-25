import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString =
    process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is not set.");
}

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log("🌱 Starting Printoura database seed...\n");

    // ============================================================
    // 01 - PRINTING
    // ============================================================

    const printing = await prisma.category.upsert({
        where: {
            slug: "printing",
        },
        update: {
            name: "Printing",
            description:
                "Professional printing services for personal, educational, business, and promotional needs.",
            isActive: true,
            sortOrder: 1,
        },
        create: {
            name: "Printing",
            slug: "printing",
            description:
                "Professional printing services for personal, educational, business, and promotional needs.",
            isActive: true,
            sortOrder: 1,
        },
    });

    const printingServices = [
        {
            name: "Visiting Card",
            slug: "visiting-card",
            sortOrder: 1,
            shortDescription: "Professional visiting and business card printing.",
        },
        {
            name: "Class Card",
            slug: "class-card",
            sortOrder: 2,
            shortDescription: "Custom class card printing for tuition classes.",
        },
        {
            name: "Tute",
            slug: "tute",
            sortOrder: 3,
            shortDescription: "High-quality tuition note and tute printing.",
        },
        {
            name: "File Covers",
            slug: "file-covers",
            sortOrder: 4,
            shortDescription: "Custom printed covers for files and documents.",
        },
        {
            name: "Bookmark",
            slug: "bookmark",
            sortOrder: 5,
            shortDescription: "Custom bookmark printing for schools, businesses, and events.",
        },
        {
            name: "Flyers",
            slug: "flyers",
            sortOrder: 6,
            shortDescription: "Eye-catching flyer and leaflet printing.",
        },
        {
            name: "Brochures",
            slug: "brochures",
            sortOrder: 7,
            shortDescription: "Professional brochure printing for promotions and businesses.",
        },
        {
            name: "Lunch Box",
            slug: "lunch-box",
            sortOrder: 8,
            shortDescription: "Custom printed lunch box packaging.",
        },
        {
            name: "Letter Head",
            slug: "letter-head",
            sortOrder: 9,
            shortDescription: "Professional letterhead printing for businesses and organizations.",
        },
        {
            name: "T Shirts",
            slug: "t-shirts",
            sortOrder: 10,
            shortDescription: "Custom T-shirt printing for teams, events, and promotions.",
        },
        {
            name: "PVC ID Cards & Lanyard",
            slug: "pvc-id-cards-lanyard",
            sortOrder: 11,
            shortDescription: "Custom PVC ID cards with lanyards.",
        },
        {
            name: "Sticker",
            slug: "sticker",
            sortOrder: 12,
            shortDescription: "Custom sticker printing in various sizes and finishes.",
        },
        {
            name: "Booklet",
            slug: "booklet",
            sortOrder: 13,
            shortDescription: "Booklet printing for documents, promotions, and events.",
        },
        {
            name: "Posters",
            slug: "posters",
            sortOrder: 14,
            shortDescription: "High-quality poster printing for advertising and events.",
        },
        {
            name: "Wrist Band",
            slug: "wrist-band",
            sortOrder: 15,
            shortDescription: "Custom wristband printing for events and promotions.",
        },
        {
            name: "X Banners",
            slug: "x-banners",
            sortOrder: 16,
            shortDescription: "Portable X-banner printing for promotions and events.",
        },
        {
            name: "Key Tags",
            slug: "key-tags",
            sortOrder: 17,
            shortDescription: "Custom key tag printing for businesses and promotions.",
        },
    ];

    // ============================================================
    // 02 - DESIGNING & VIDEO EDITING
    // ============================================================

    const designing = await prisma.category.upsert({
        where: {
            slug: "designing-video-editing",
        },
        update: {
            name: "Designing & Video Editing",
            description:
                "Creative design and video editing services for personal and business needs.",
            isActive: true,
            sortOrder: 2,
        },
        create: {
            name: "Designing & Video Editing",
            slug: "designing-video-editing",
            description:
                "Creative design and video editing services for personal and business needs.",
            isActive: true,
            sortOrder: 2,
        },
    });

    const designingServices = [
        {
            name: "Social Media Post",
            slug: "social-media-post",
            sortOrder: 1,
            shortDescription:
                "Creative social media post designs for businesses and promotions.",
        },
        {
            name: "CV",
            slug: "cv",
            sortOrder: 2,
            shortDescription: "Professional CV design for job applications.",
        },
        {
            name: "Thumbnails",
            slug: "thumbnails",
            sortOrder: 3,
            shortDescription: "Eye-catching thumbnail designs for digital content.",
        },
        {
            name: "Logo Design",
            slug: "logo-design",
            sortOrder: 4,
            shortDescription: "Creative logo design for brands and businesses.",
        },
        {
            name: "Video Editing",
            slug: "video-editing",
            sortOrder: 5,
            shortDescription: "Professional video editing for social media, events, and businesses.",
        },
    ];

    // ============================================================
    // 03 - ADVERTISING
    // ============================================================

    const advertising = await prisma.category.upsert({
        where: {
            slug: "advertising",
        },
        update: {
            name: "Advertising",
            description:
                "Advertising solutions including signage, flex printing, and display spaces.",
            isActive: true,
            sortOrder: 3,
        },
        create: {
            name: "Advertising",
            slug: "advertising",
            description:
                "Advertising solutions including signage, flex printing, and display spaces.",
            isActive: true,
            sortOrder: 3,
        },
    });

    const advertisingServices = [
        {
            name: "Name Board",
            slug: "name-board",
            sortOrder: 1,
            shortDescription: "Custom name boards for businesses and organizations.",
        },
        {
            name: "Flex",
            slug: "flex",
            sortOrder: 2,
            shortDescription: "Large-format flex printing for advertising and events.",
        },
        {
            name: "Billboard Space Rental",
            slug: "billboard-space-rental",
            sortOrder: 3,
            shortDescription: "Billboard advertising space for business promotions.",
        },
        {
            name: "Glass Sticker",
            slug: "glass-sticker",
            sortOrder: 4,
            shortDescription: "Custom glass sticker printing for shops, offices, and vehicles.",
        },
    ];

    // ============================================================
    // 04 - PHOTO FRAMES
    // ============================================================

    const photoFrames = await prisma.category.upsert({
        where: {
            slug: "photo-frames",
        },
        update: {
            name: "Photo Frames",
            description:
                "Custom photo frame printing and framing services in different sizes.",
            isActive: true,
            sortOrder: 4,
        },
        create: {
            name: "Photo Frames",
            slug: "photo-frames",
            description:
                "Custom photo frame printing and framing services in different sizes.",
            isActive: true,
            sortOrder: 4,
        },
    });

    const photoFrameServices = [
        {
            name: "Size Wise Photo Frames",
            slug: "size-wise-photo-frames",
            sortOrder: 1,
            shortDescription:
                "Custom photo frames available in different sizes.",
        },
    ];

    // ============================================================
    // 05 - GIFT ITEMS
    // ============================================================

    const giftItems = await prisma.category.upsert({
        where: {
            slug: "gift-items",
        },
        update: {
            name: "Gift Items",
            description:
                "Personalized gift items suitable for special occasions and celebrations.",
            isActive: true,
            sortOrder: 5,
        },
        create: {
            name: "Gift Items",
            slug: "gift-items",
            description:
                "Personalized gift items suitable for special occasions and celebrations.",
            isActive: true,
            sortOrder: 5,
        },
    });

    const giftServices = [
        {
            name: "White Mug",
            slug: "white-mug",
            sortOrder: 1,
            shortDescription: "Custom printed white mugs for gifts and promotions.",
        },
        {
            name: "Magic Mug",
            slug: "magic-mug",
            sortOrder: 2,
            shortDescription: "Personalized magic mugs with custom designs.",
        },
        {
            name: "Glass Frame Tika",
            slug: "glass-frame-tika",
            sortOrder: 3,
            shortDescription:
                "Custom glass frame tika gifts for special occasions.",
        },
    ];

    // ============================================================
    // 06 - WEB DESIGNING
    // ============================================================

    const webDesigning = await prisma.category.upsert({
        where: {
            slug: "web-designing",
        },
        update: {
            name: "Web Designing",
            description:
                "Modern website design and development services for businesses and individuals.",
            isActive: true,
            sortOrder: 6,
        },
        create: {
            name: "Web Designing",
            slug: "web-designing",
            description:
                "Modern website design and development services for businesses and individuals.",
            isActive: true,
            sortOrder: 6,
        },
    });

    // ============================================================
    // CREATE SERVICES
    // ============================================================

    async function createServices(
        categoryId: string,
        services: Array<{
            name: string;
            slug: string;
            sortOrder: number;
            shortDescription: string;
        }>
    ) {
        for (const service of services) {
            await prisma.service.upsert({
                where: {
                    slug: service.slug,
                },
                update: {
                    categoryId,
                    name: service.name,
                    shortDescription: service.shortDescription,
                    isActive: true,
                    sortOrder: service.sortOrder,
                },
                create: {
                    categoryId,
                    name: service.name,
                    slug: service.slug,
                    shortDescription: service.shortDescription,
                    isActive: true,
                    sortOrder: service.sortOrder,
                },
            });

            console.log(`   ✅ ${service.name}`);
        }
    }

    console.log("📦 Printing services...");
    await createServices(printing.id, printingServices);

    console.log("\n🎨 Designing & Video Editing services...");
    await createServices(designing.id, designingServices);

    console.log("\n📢 Advertising services...");
    await createServices(advertising.id, advertisingServices);

    console.log("\n🖼️ Photo Frame services...");
    await createServices(photoFrames.id, photoFrameServices);

    console.log("\n🎁 Gift Item services...");
    await createServices(giftItems.id, giftServices);

    console.log("\n🌐 Web Designing category created.");
    console.log("   ℹ️ No web-designing services added yet.");

    console.log("\n🌱 Printoura database seed completed successfully!");
}

main()
    .catch((error) => {
        console.error("\n❌ Seed failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });