const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const optimizeImageUrl = (url) => {
  if (!url) return url;
  if (url.includes("images.unsplash.com")) {
    return url.includes("?") ? url : `${url}?auto=format&fit=crop&w=600&q=80`;
  }
  if (url.includes("images.pexels.com")) {
    return url.includes("?") ? url : `${url}?auto=compress&cs=tinysrgb&w=600`;
  }
  return url;
};


const initial100Products = [

  // WATCHES
  { name: "Classic White Executive Watch", category: "Watches", price: 149.99, description: "Elegant white dial analog watch with a sleek minimal bezel.", image: "https://images.pexels.com/photos/11732775/pexels-photo-11732775.jpeg" },
  { name: "Modern Urban Chronograph", category: "Watches", price: 189.99, description: "Contemporary design featuring detailed chronograph sub-dials.", image: "https://images.pexels.com/photos/20527951/pexels-photo-20527951.jpeg" },
  { name: "Minimalist Black Dial Watch", category: "Watches", price: 129.5, description: "Sleek all-black face paired with a comfortable modern strap.", image: "https://images.pexels.com/photos/3419331/pexels-photo-3419331.jpeg" },
  { name: "Luxury Steel Mesh Wristwatch", category: "Watches", price: 210, description: "Premium metallic casing with breathable stainless steel mesh band.", image: "https://images.pexels.com/photos/5058216/pexels-photo-5058216.jpeg" },
  { name: "Vintage Leather Strap Watch", category: "Watches", price: 165, description: "Classic aesthetic with genuine textured leather and brass casing.", image: "https://images.pexels.com/photos/16093243/pexels-photo-16093243.jpeg" },
  { name: "Silver Executive Dress Watch", category: "Watches", price: 175, description: "Polished silver finish ideal for business and formal wear.", image: "https://images.pexels.com/photos/11700618/pexels-photo-11700618.jpeg" },
  { name: "Minimalist Gold Accent Watch", category: "Watches", price: 155, description: "Subtle gold detailing on a clean dial for modern elegance.", image: "https://images.pexels.com/photos/8364556/pexels-photo-8364556.jpeg" },
  { name: "Dark Aesthetic Chrono Watch", category: "Watches", price: 199.99, description: "Bold dark design crafted for daily lifestyle and street style.", image: "https://images.pexels.com/photos/14410757/pexels-photo-14410757.jpeg" },
  { name: "Rugged G-Shock Sports Watch", category: "Watches", price: 119.99, description: "Heavy-duty shock resistant digital-analog watch with stopwatch.", image: "https://images.pexels.com/photos/158741/gshock-watch-sports-watch-stopwatch-158741.jpeg" },
  { name: "Sleek Black Steel Wristwatch", category: "Watches", price: 185, description: "Matte black stainless steel build with anti-scratch glass.", image: "https://images.pexels.com/photos/28977357/pexels-photo-28977357.jpeg" },
  // SHOES
  { name: "Urban White Lifestyle Sneakers", category: "Shoes", price: 89.99, description: "Clean and minimal white sneakers designed for everyday street fashion.", image: "https://images.pexels.com/photos/9992898/pexels-photo-9992898.jpeg" },
  { name: "Classic Canvas Low-Top Sneakers", category: "Shoes", price: 65, description: "Timeless casual canvas shoes offering maximum comfort and durability.", image: "https://images.pexels.com/photos/4161710/pexels-photo-4161710.jpeg" },
  { name: "Retro Aesthetic Sports Sneakers", category: "Shoes", price: 110, description: "Vintage-inspired multi-tone sneakers built for comfort and casual outings.", image: "https://images.pexels.com/photos/15398044/pexels-photo-15398044.jpeg" },
  { name: "Performance Athletic Running Shoes", category: "Shoes", price: 125.5, description: "Lightweight breathable running shoes engineered for superior cushioning.", image: "https://images.pexels.com/photos/1102776/pexels-photo-1102776.jpeg" },
  { name: "High-Top Streetwear Sneakers", category: "Shoes", price: 95, description: "Bold high-top sneakers with durable grip rubber soles.", image: "https://images.pexels.com/photos/8497536/pexels-photo-8497536.jpeg" },
  { name: "Minimalist Suede Casual Shoes", category: "Shoes", price: 105, description: "Soft suede finish low-profile shoes perfect for smart-casual wear.", image: "https://images.pexels.com/photos/12210270/pexels-photo-12210270.jpeg" },
  { name: "Chunky Platform Sport Sneakers", category: "Shoes", price: 115, description: "Trendy chunky sole athletic shoes with modern edge detailing.", image: "https://images.pexels.com/photos/6131198/pexels-photo-6131198.jpeg" },
  { name: "Premium Leather Formal Loafers", category: "Shoes", price: 145, description: "Handcrafted leather loafers designed for executive and formal styling.", image: "https://images.pexels.com/photos/29699304/pexels-photo-29699304.jpeg" },
  { name: "Dynamic Outdoor Trail Shoes", category: "Shoes", price: 130, description: "Rugged tread pattern designed for outdoor activities and stability.", image: "https://images.pexels.com/photos/18542177/pexels-photo-18542177.jpeg" },
  { name: "Classic Brown Leather Boots", category: "Shoes", price: 155, description: "Durable textured leather ankle boots for a rugged, stylish look.", image: "https://images.pexels.com/photos/9337520/pexels-photo-9337520.jpeg" },
  // JEANS
  { name: "Classic Blue Denim Jeans", category: "Jeans", price: 59.99, description: "Timeless regular fit blue denim jeans crafted for durable everyday wear.", image: "https://images.pexels.com/photos/36158507/pexels-photo-36158507.jpeg" },
  { name: "Urban Slim Fit Dark Jeans", category: "Jeans", price: 64.99, description: "Modern dark wash jeans featuring a tailored slim profile.", image: "https://images.pexels.com/photos/16069736/pexels-photo-16069736.jpeg" },
  { name: "Vintage Straight Cut Denim", category: "Jeans", price: 69.5, description: "Authentic vintage wash denim with a relaxed straight-leg silhouette.", image: "https://images.pexels.com/photos/2244954/pexels-photo-2244954.jpeg" },
  { name: "Modern Light Wash Jeans", category: "Jeans", price: 54.99, description: "Casual light blue jeans perfect for summer and weekend outfits.", image: "https://images.pexels.com/photos/17515363/pexels-photo-17515363.jpeg" },
  { name: "Streetwear Ripped Denim Jeans", category: "Jeans", price: 74.99, description: "Edgy distressed denim featuring stylish knee rips and modern wash.", image: "https://images.pexels.com/photos/2343661/pexels-photo-2343661.jpeg" },
  { name: "Casual Tapered Fit Jeans", category: "Jeans", price: 62, description: "Comfortable tapered leg denim designed for versatile casual wear.", image: "https://images.pexels.com/photos/15565634/pexels-photo-15565634.jpeg" },
  { name: "Rugged Indigo Denim Pants", category: "Jeans", price: 68, description: "Deep indigo shade denim offering high durability and classic style.", image: "https://images.pexels.com/photos/335435/pexels-photo-335435.jpeg" },
  { name: "Washed Black Slim Jeans", category: "Jeans", price: 65, description: "Sleek faded black denim ideal for smart-casual evening looks.", image: "https://images.pexels.com/photos/10216024/pexels-photo-10216024.jpeg" },
  { name: "Relaxed Loose Fit Denim", category: "Jeans", price: 58.5, description: "Comfortable wide-leg fit inspired by 90s classic streetwear.", image: "https://images.pexels.com/photos/30710244/pexels-photo-30710244.jpeg" },
  { name: "Minimalist Charcoal Grey Jeans", category: "Jeans", price: 67, description: "Versatile grey wash jeans crafted from premium stretch cotton.", image: "https://images.pexels.com/photos/4933557/pexels-photo-4933557.jpeg" },
  // T-SHIRTS
  { name: "Minimalist White Essential Tee", category: "T-Shirts", price: 24.99, description: "Clean and breathable classic white crew-neck cotton t-shirt.", image: "https://images.pexels.com/photos/13651809/pexels-photo-13651809.jpeg" },
  { name: "Urban Black Casual T-Shirt", category: "T-Shirts", price: 27.99, description: "Versatile solid black tee with a modern comfortable fit.", image: "https://images.pexels.com/photos/13651272/pexels-photo-13651272.jpeg" },
  { name: "Vintage Graphic Print Tee", category: "T-Shirts", price: 32.5, description: "Retro-inspired graphic print t-shirt made with soft premium cotton.", image: "https://images.pexels.com/photos/36908588/pexels-photo-36908588.jpeg" },
  { name: "Classic Neutral Crew-Neck Tee", category: "T-Shirts", price: 25, description: "Minimalist subtle tone t-shirt for versatile layering.", image: "https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg" },
  { name: "Relaxed Fit Oversized Tee", category: "T-Shirts", price: 29.99, description: "Streetwear oversized t-shirt designed for maximum daily comfort.", image: "https://images.pexels.com/photos/15258903/pexels-photo-15258903.png" },
  { name: "Modern Olive Casual T-Shirt", category: "T-Shirts", price: 26.5, description: "Earth tone casual t-shirt crafted from soft organic cotton.", image: "https://images.pexels.com/photos/15994973/pexels-photo-15994973.jpeg" },
  { name: "Abstract Art Print T-Shirt", category: "T-Shirts", price: 34, description: "Contemporary artistic graphic tee with unique printed detail.", image: "https://images.pexels.com/photos/38402003/pexels-photo-38402003.jpeg" },
  { name: "Textured Slim Fit Tee", category: "T-Shirts", price: 28, description: "Tailored slim-fit t-shirt featuring fine fabric texture.", image: "https://images.pexels.com/photos/37186394/pexels-photo-37186394.jpeg" },
  { name: "Sporty Athleisure T-Shirt", category: "T-Shirts", price: 29.5, description: "Lightweight stretch-fabric t-shirt suitable for workout and casual wear.", image: "https://images.pexels.com/photos/9007809/pexels-photo-9007809.jpeg" },
  { name: "Monochrome Graphic Streetwear Tee", category: "T-Shirts", price: 31.99, description: "Bold black-and-white print t-shirt for modern streetwear styling.", image: "https://images.pexels.com/photos/36899308/pexels-photo-36899308.jpeg" },
  // SHIRTS
  { name: "Classic White Oxford Shirt", category: "Shirts", price: 45, description: "Crisp and tailored white button-down oxford shirt suitable for formal and casual occasions.", image: "https://images.pexels.com/photos/32963962/pexels-photo-32963962.jpeg" },
  { name: "Casual Plaid Button-Down Shirt", category: "Shirts", price: 42.5, description: "Comfortable checkered pattern shirt featuring soft brushed cotton fabric.", image: "https://images.pexels.com/photos/7276000/pexels-photo-7276000.jpeg" },
  { name: "Modern Black Slim Fit Shirt", category: "Shirts", price: 49.99, description: "Sleek all-black formal shirt crafted with fine cotton stretch.", image: "https://images.pexels.com/photos/11976422/pexels-photo-11976422.jpeg" },
  { name: "Relaxed Linen Summer Shirt", category: "Shirts", price: 48, description: "Lightweight breathable linen blend shirt perfect for warm weather styling.", image: "https://images.pexels.com/photos/3378892/pexels-photo-3378892.jpeg" },
  { name: "Vintage Flannel Checkered Shirt", category: "Shirts", price: 52, description: "Durable warm flannel shirt designed for layered outdoor looks.", image: "https://images.pexels.com/photos/14773602/pexels-photo-14773602.jpeg" },
  { name: "Smart Formal Dress Shirt", category: "Shirts", price: 55, description: "Executive sharp dress shirt with structured collar and cuff details.", image: "https://images.pexels.com/photos/5156489/pexels-photo-5156489.jpeg" },
  { name: "Casual Striped Cotton Shirt", category: "Shirts", price: 44.99, description: "Classic vertical stripe button-down shirt with a comfortable relaxed cut.", image: "https://images.pexels.com/photos/4443831/pexels-photo-4443831.jpeg" },
  { name: "Urban Denim Button-Up Shirt", category: "Shirts", price: 58, description: "Rugged denim material shirt built for modern streetwear aesthetics.", image: "https://images.pexels.com/photos/15590109/pexels-photo-15590109.jpeg" },
  { name: "Contemporary Pastel Casual Shirt", category: "Shirts", price: 46.5, description: "Soft tone everyday shirt designed for effortless modern styling.", image: "https://images.pexels.com/photos/9293807/pexels-photo-9293807.jpeg" },
  { name: "Textured Short-Sleeve Cuban Shirt", category: "Shirts", price: 39.99, description: "Relaxed open-collar short-sleeve shirt for casual weekend outings.", image: "https://images.pexels.com/photos/4880403/pexels-photo-4880403.jpeg" },
  // WOMEN SHOES
  { name: "Elegant High Heel Pumps", category: "Women Shoes", price: 89.99, description: "Sophisticated stiletto pumps designed for formal events and evening wear.", image: "https://images.pexels.com/photos/5168562/pexels-photo-5168562.jpeg" },
  { name: "Classic Strappy Sandals", category: "Women Shoes", price: 64.99, description: "Minimalist open-toe heel sandals featuring delicate ankle straps.", image: "https://images.pexels.com/photos/27256454/pexels-photo-27256454.jpeg" },
  { name: "Chic Suede Ankle Boots", category: "Women Shoes", price: 109.5, description: "Soft suede finish ankle boots with a sturdy block heel.", image: "https://images.pexels.com/photos/14706989/pexels-photo-14706989.jpeg" },
  { name: "Modern Urban Chunky Heels", category: "Women Shoes", price: 79.99, description: "Contemporary chunky heel sandals combining comfort and bold style.", image: "https://images.pexels.com/photos/18935118/pexels-photo-18935118.jpeg" },
  { name: "Casual White Fashion Sneakers", category: "Women Shoes", price: 69.99, description: "Trendy platform sneakers perfect for versatile street style.", image: "https://images.pexels.com/photos/15694921/pexels-photo-15694921.jpeg" },
  { name: "Graceful Pointed Toe Flats", category: "Women Shoes", price: 54, description: "Sleek pointed-toe flat shoes tailored for everyday elegance.", image: "https://images.pexels.com/photos/14816287/pexels-photo-14816287.jpeg" },
  { name: "Luxury Leather Dress Heels", category: "Women Shoes", price: 115, description: "Premium leather heels designed for high-end occasions.", image: "https://images.pexels.com/photos/14706988/pexels-photo-14706988.jpeg" },
  { name: "Minimalist Slip-On Loafers", category: "Women Shoes", price: 74.5, description: "Comfortable textured loafers ideal for smart-casual wear.", image: "https://images.pexels.com/photos/29536888/pexels-photo-29536888.jpeg" },
  { name: "Vintage Platform Mule Sandals", category: "Women Shoes", price: 84.99, description: "Retro-inspired open-back mules with elevated platform soles.", image: "https://images.pexels.com/photos/26856061/pexels-photo-26856061.jpeg" },
  { name: "Statement Metallic Stilettos", category: "Women Shoes", price: 120, description: "Eye-catching metallic finish heels for special celebration looks.", image: "https://images.pexels.com/photos/20528267/pexels-photo-20528267.jpeg" },
  // HANDBAGS
  { name: "Luxury Leather Shoulder Bag", category: "Handbags", price: 129.99, description: "Elegant textured leather shoulder bag designed for modern daily essentials.", image: "https://images.pexels.com/photos/5352628/pexels-photo-5352628.jpeg" },
  { name: "Chic Minimalist Tote Bag", category: "Handbags", price: 89.5, description: "Spacious everyday tote bag crafted with sleek structure and sturdy handles.", image: "https://images.pexels.com/photos/22432991/pexels-photo-22432991.jpeg" },
  { name: "Classic Crossbody Satchel", category: "Handbags", price: 95, description: "Versatile crossbody satchel featuring premium strap accents and secure zip.", image: "https://images.pexels.com/photos/8989582/pexels-photo-8989582.jpeg" },
  { name: "Urban Designer Handbag", category: "Handbags", price: 145, description: "Contemporary structured handbag with clean lines and polished hardware.", image: "https://images.pexels.com/photos/22434759/pexels-photo-22434759.jpeg" },
  { name: "Vintage Style Leather Clutch", category: "Handbags", price: 75, description: "Compact retro-inspired clutch perfect for evening gatherings and formal wear.", image: "https://images.pexels.com/photos/18601568/pexels-photo-18601568.jpeg" },
  { name: "Modern Chain Strap Purse", category: "Handbags", price: 110, description: "Stylish flap purse featuring a elegant metallic chain shoulder strap.", image: "https://images.pexels.com/photos/36367484/pexels-photo-36367484.jpeg" },
  { name: "Casual Textured Bucket Bag", category: "Handbags", price: 84.99, description: "Relaxed bucket handbag offering generous storage and effortless style.", image: "https://images.pexels.com/photos/27849638/pexels-photo-27849638.jpeg" },
  { name: "Elegant Neutral Tone Tote", category: "Handbags", price: 99.99, description: "Subtle neutral shade handbag crafted for effortless everyday pairing.", image: "https://images.pexels.com/photos/5706269/pexels-photo-5706269.jpeg" },
  { name: "Sophisticated Executive Brief Tote", category: "Handbags", price: 135, description: "Tailored business tote with organized interior compartments for work.", image: "https://images.pexels.com/photos/9327162/pexels-photo-9327162.jpeg" },
  { name: "Statement Quilted Handbag", category: "Handbags", price: 119.5, description: "Soft quilted texture handbag with premium finish for a high-end aesthetic.", image: "https://images.pexels.com/photos/7953286/pexels-photo-7953286.jpeg" },
  // WOMEN WATCHES
  { name: "Graceful Gold Mesh Watch", category: "Women Watches", price: 139.99, description: "Delicate gold-tone mesh strap watch with a minimal minimalist dial.", image: "https://images.pexels.com/photos/10557834/pexels-photo-10557834.jpeg" },
  { name: "Chic Dark Aesthetic Watch", category: "Women Watches", price: 145, description: "Sleek dark dial wristwatch designed for modern evening styling.", image: "https://images.pexels.com/photos/14410757/pexels-photo-14410757.jpeg" },
  { name: "Rose Gold Executive Watch", category: "Women Watches", price: 165, description: "Elegant rose gold finish wrist watch featuring a clean mother-of-pearl dial.", image: "https://images.pexels.com/photos/8032247/pexels-photo-8032247.jpeg" },
  { name: "Minimalist Leather Strap Watch", category: "Women Watches", price: 119.5, description: "Classic slim leather strap paired with a subtle metallic case.", image: "https://images.pexels.com/photos/37050003/pexels-photo-37050003.jpeg" },
  { name: "Petite Silver Chain Watch", category: "Women Watches", price: 129, description: "Dainty silver bracelet watch crafted for everyday formal elegance.", image: "https://images.pexels.com/photos/13596383/pexels-photo-13596383.jpeg" },
  { name: "Modern Pastel Dial Wristwatch", category: "Women Watches", price: 110, description: "Soft pastel shade face with polished metallic accents.", image: "https://images.pexels.com/photos/8989488/pexels-photo-8989488.jpeg" },
  { name: "Luxury Crystal Accent Watch", category: "Women Watches", price: 175, description: "Sophisticated timepiece decorated with subtle crystal bezel markers.", image: "https://images.pexels.com/photos/11105247/pexels-photo-11105247.jpeg" },
  { name: "Vintage Marble Face Watch", category: "Women Watches", price: 135, description: "Unique marble texture dial surrounded by a slim metallic bezel.", image: "https://images.pexels.com/photos/691120/pexels-photo-691120.jpeg" },
  { name: "Classic Steel Link Watch", category: "Women Watches", price: 150, description: "Timeless stainless steel bracelet watch with durable anti-scratch glass.", image: "https://images.pexels.com/photos/10088344/pexels-photo-10088344.jpeg" },
  { name: "Slim Black Minimalist Watch", category: "Women Watches", price: 125, description: "Ultra-thin black dial watch designed for a clean contemporary look.", image: "https://images.pexels.com/photos/31050003/pexels-photo-31050003.jpeg" },
  // JEWELRY
  { name: "Elegant Gold Pendant Necklace", category: "Jewelry", price: 85, description: "Delicate gold chain necklace featuring a minimalist polished pendant.", image: "https://images.pexels.com/photos/28933801/pexels-photo-28933801.jpeg" },
  { name: "Classic Gold Layered Chain", category: "Jewelry", price: 92.5, description: "Sophisticated layered gold chain designed for elegant daily wear.", image: "https://images.pexels.com/photos/28933800/pexels-photo-28933800.jpeg" },
  { name: "Minimalist Silver Stud Earrings", category: "Jewelry", price: 45, description: "Timeless fine silver stud earrings with a high-polish finish.", image: "https://images.pexels.com/photos/4155246/pexels-photo-4155246.jpeg" },
  { name: "Luxury Gemstone Ring Set", category: "Jewelry", price: 115, description: "Exquisite statement ring featuring a crystal gemstone accent.", image: "https://images.pexels.com/photos/5704724/pexels-photo-5704724.jpeg" },
  { name: "Modern Textured Gold Hoop Earrings", category: "Jewelry", price: 65, description: "Chic lightweight gold hoop earrings with subtle modern texturing.", image: "https://images.pexels.com/photos/36069125/pexels-photo-36069125.jpeg" },
  { name: "Graceful Pearl Drop Earrings", category: "Jewelry", price: 78, description: "Classic freshwater pearl drop earrings tailored for special events.", image: "https://images.pexels.com/photos/13524236/pexels-photo-13524236.jpeg" },
  { name: "Vintage Gold Charm Bracelet", category: "Jewelry", price: 89.99, description: "Intricately detailed gold link bracelet with subtle vintage accents.", image: "https://images.pexels.com/photos/7514818/pexels-photo-7514818.jpeg" },
  { name: "Statement Diamond-Style Crystal Ring", category: "Jewelry", price: 135, description: "Brilliant cut crystal solitaire ring crafted in a band of sterling silver.", image: "https://images.pexels.com/photos/10082804/pexels-photo-10082804.jpeg" },
  { name: "Chic Metallic Cuff Bracelet", category: "Jewelry", price: 58, description: "Sleek open-cuff wristband offering a clean, modern aesthetic.", image: "https://images.pexels.com/photos/9421333/pexels-photo-9421333.jpeg" },
  { name: "Contemporary Fine Choker Necklace", category: "Jewelry", price: 72.5, description: "Slim metallic choker necklace designed to complement modern outfits.", image: "https://images.pexels.com/photos/34549909/pexels-photo-34549909.jpeg" },
  // WOMEN DRESSES
  { name: "Floral Summer Sundress", category: "Women Dresses", price: 69.99, description: "Lightweight breathable sundress featuring a vibrant floral pattern.", image: "https://images.pexels.com/photos/8619007/pexels-photo-8619007.jpeg" },
  { name: "Elegant Silk Evening Gown", category: "Women Dresses", price: 149.5, description: "Flowing floor-length evening dress crafted with a smooth silky drape.", image: "https://images.pexels.com/photos/35576566/pexels-photo-35576566.jpeg" },
  { name: "Classic Little Black Dress", category: "Women Dresses", price: 89.0, description: "Timeless slim-fit cocktail dress designed for versatile evening elegance.", image: "https://images.pexels.com/photos/10324427/pexels-photo-10324427.jpeg" },
  { name: "Chic Pleated Midi Dress", category: "Women Dresses", price: 79.99, description: "Modern mid-length dress with graceful pleating and a defined waist line.", image: "https://images.pexels.com/photos/32703666/pexels-photo-32703666.jpeg" },
  { name: "Casual Cotton Shirt Dress", category: "Women Dresses", price: 59.5, description: "Relaxed button-front shirt dress offering clean day-to-day style.", image: "https://images.pexels.com/photos/7202800/pexels-photo-7202800.jpeg" },
  { name: "Graceful Wrap Style Dress", category: "Women Dresses", price: 74.99, description: "Flattering V-neck wrap dress tailored for casual and semi-formal wear.", image: "https://images.pexels.com/photos/8396727/pexels-photo-8396727.jpeg" },
  { name: "Bohemian Printed Maxi Dress", category: "Women Dresses", price: 84.5, description: "Relaxed maxi dress with intricate boho prints and subtle tiered details.", image: "https://images.pexels.com/photos/6995867/pexels-photo-6995867.jpeg" },
  { name: "Minimalist White Summer Dress", category: "Women Dresses", price: 65.0, description: "Clean and airy linen-blend dress perfect for warm outdoor occasions.", image: "https://images.pexels.com/photos/9594692/pexels-photo-9594692.jpeg" },
  { name: "Sophisticated Bodycon Dress", category: "Women Dresses", price: 92.0, description: "Tailored form-fitting dress designed with fine stretch fabric.", image: "https://images.pexels.com/photos/8083848/pexels-photo-8083848.jpeg" },
  { name: "Vintage Pattern A-Line Dress", category: "Women Dresses", price: 79.5, description: "Classic flared A-line silhouette dress featuring vintage pattern work.", image: "https://images.pexels.com/photos/14594539/pexels-photo-14594539.jpeg" }
];

// New Arrivals 
const newArrivals30 = [
  // Womenswear
  { title: "Structured Tailored Blazer", price: 280, category: "Women", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800" },
  { title: "Monochrome Trench Coat", price: 350, category: "Women", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800" },
  { title: "Leather Crossbody Handbag", price: 310, category: "Women", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800" },
  { title: "Silk Wrap Evening Gown", price: 420, category: "Women", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800" },
  { title: "Pleated Linen Midi Skirt", price: 180, category: "Women", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800" },
  { title: "Cashmere Knit Turtleneck", price: 240, category: "Women", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800" },
  { title: "High-Waisted Tailored Trousers", price: 190, category: "Women", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800" },
  { title: "Floral Silk Summer Dress", price: 295, category: "Women", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800" },
  { title: "Oversized Denim Jacket", price: 165, category: "Women", image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=800" },
  { title: "Minimalist Leather Heeled Sandals", price: 210, category: "Women", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800" },
  // Menswear
  { title: "Minimalist Linen Overshirt", price: 140, category: "Men", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800" },
  { title: "Classic Heavyweight Cotton Tee", price: 65, category: "Men", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800" },
  { title: "Slim Fit Indigo Jeans", price: 110, category: "Men", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800" },
  { title: "Italian Leather Biker Jacket", price: 320, category: "Men", image: "https://images.pexels.com/photos/35223914/pexels-photo-35223914.jpeg" }, { title: "Wool Blend Tailored Suit", price: 390, category: "Men", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800" },
  { title: "Relaxed Fit Chino Trousers", price: 125, category: "Men", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800" },
  { title: "Organic Merino Wool Cardigan", price: 210, category: "Men", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800" },
  { title: "Tailored Oxford Button-Down Shirt", price: 115, category: "Men", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800" },
  { title: "Urban Suede Chelsea Boots", price: 275, category: "Men", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800" },
  { title: "Sleeveless Minimalist Vest", price: 90, category: "Men", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800" },
  // Accessories
  { title: "Gold Rimmed Aviator Sunglasses", price: 195, category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800" },
  { title: "Minimalist Automatic Watch", price: 420, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800" },
  { title: "Full-Grain Leather Wallet", price: 95, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800" },
  { title: "Handcrafted Leather Ankle Boots", price: 290, category: "Accessories", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800" },
  { title: "Minimalist Silver Cuff Bracelet", price: 150, category: "Women", image: "https://images.pexels.com/photos/14509642/pexels-photo-14509642.jpeg" }, { title: "Printed Silk Neck Scarf", price: 85, category: "Accessories", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800" },
  { title: "Black Dial Chronograph Watch", price: 460, category: "Accessories", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800" },
  { title: "Polarized Square Frame Sunglasses", price: 175, category: "Accessories", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800" },
  { title: "Structured Leather Tote Bag", price: 340, category: "Accessories", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800" },
  { title: "Artisanal Leather Belt with Brass Buckle", price: 110, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800" }
];

const formatted100 = initial100Products.map(p => {
  const optimizedImg = optimizeImageUrl(p.image);
  return {
    title: p.name || p.title,
    description: p.description || `${p.name || p.title} - High quality selection.`,
    price: p.price,
    category: p.category,
    image: optimizedImg,
    images: [optimizedImg],
    stockCount: 20,
    isFeatured: false,
    isNewArrival: false
  };
});

const formattedNewArrivals = newArrivals30.map(p => {
  const optimizedImg = optimizeImageUrl(p.image);
  return {
    title: p.title || p.name,
    description: p.description || `${p.title || p.name} - Luxury modern fashion collection.`,
    price: p.price,
    category: p.category,
    image: optimizedImg,
    images: [optimizedImg],
    stockCount: 15,
    isFeatured: true,
    isNewArrival: true
  };
});

const allFinalProducts = [...formatted100, ...formattedNewArrivals];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");

    await Product.deleteMany({});
    console.log("Old products cleared.");

    await Product.insertMany(allFinalProducts);

    console.log(`Database successfully seeded with ${allFinalProducts.length} fast-loading products!`);
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
};

seedDatabase();