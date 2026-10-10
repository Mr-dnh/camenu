export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  image: string;
  dishes: Dish[];
};

// متن‌ها و قیمت‌ها نمونه‌اند؛ عکس‌ها را با فایل‌های خودت جایگزین کن.
export const menuCategories: MenuCategory[] = [
  {
    id: "breakfast",
    name: "صبحانه",
    subtitle: "کلاسیک / شیرین / سالم",
    color: "#f5ce96",
    image: "/images/categories/breakfast.jpg",
    dishes: [
      { id: "sunrise-plate", name: "بشقاب طلوع", description: "تخم‌مرغ، نان خمیرترش برشته، لبنه و سبزیجات تازه.", price: 12, image: "/images/dishes/sunrise-plate.jpg", tag: "HOUSE FAVORITE" },
      { id: "ricotta-pancakes", name: "پنکیک ریکوتا", description: "پنکیک نرم با ریکوتا، توت‌های تازه و شیره افرا.", price: 10, image: "/images/dishes/ricotta-pancakes.jpg" },
      { id: "avocado-toast", name: "تست آووکادو", description: "آووکادو، لیمو، روغن چیلی و نان برشته.", price: 9, image: "/images/dishes/avocado-toast.jpg", tag: "VEGETARIAN" }
    ]
  },
  {
    id: "pasta",
    name: "پاستا",
    subtitle: "کلاسیک / دریایی / ویژه",
    color: "#f2eee8",
    image: "/images/categories/pasta.jpg",
    dishes: [
      { id: "truffle-tagliatelle", name: "تاگلیاتله ترافل", description: "پاستای تازه با قارچ جنگلی و پنیر پارمزان.", price: 18, image: "/images/dishes/truffle-tagliatelle.jpg", tag: "HOUSE FAVORITE" },
      { id: "spicy-rigatoni", name: "ریگاتونی تند", description: "گوجه‌فرنگی آرام‌پز، خامه، فلفل و پکورینو.", price: 16, image: "/images/dishes/spicy-rigatoni.jpg" },
      { id: "lemon-linguine", name: "لینگوئینی لیمویی", description: "کره لیمویی، جعفری، فلفل سیاه و پارمزان.", price: 15, image: "/images/dishes/lemon-linguine.jpg", tag: "VEGETARIAN" }
    ]
  },
  {
    id: "pizza",
    name: "پیتزا",
    subtitle: "اصیل / خاص / ویژه",
    color: "#efa04d",
    image: "/images/categories/pizza.jpg",
    dishes: [
      { id: "margherita", name: "مارگاریتا", description: "گوجه سن‌مارزانو، موزارلا، ریحان و روغن زیتون.", price: 14, image: "/images/dishes/margherita.jpg", tag: "CLASSIC" },
      { id: "hot-honey", name: "هات هانی", description: "پپرونی، موزارلا، فلفل ترشی و عسل تند.", price: 17, image: "/images/dishes/hot-honey.jpg" },
      { id: "wild-mushroom-pizza", name: "پیتزای قارچ", description: "قارچ برشته، آویشن، پنیر تاله‌جو و روغن سیر.", price: 16, image: "/images/dishes/wild-mushroom-pizza.jpg", tag: "VEGETARIAN" }
    ]
  },
  {
    id: "lunch",
    name: "ناهار",
    subtitle: "سالاد / ساندویچ / کاسه‌های سالم",
    color: "#f3e9e8",
    image: "/images/categories/lunch.jpg",
    dishes: [
      { id: "crispy-chicken", name: "مرغ سوخاری", description: "مرغ باترمیلک، کلم خردشده و خیارشور خانگی.", price: 16, image: "/images/dishes/crispy-chicken.jpg" },
      { id: "market-bowl", name: "کاسه سبزیجات", description: "سبزیجات فصلی، غلات، سبزی معطر و سس ارده.", price: 13, image: "/images/dishes/market-bowl.jpg", tag: "VEGETARIAN" },
      { id: "steak-sandwich", name: "ساندویچ استیک", description: "استیک ورقه‌ای، پیاز کاراملی و سبزیجات تازه.", price: 19, image: "/images/dishes/steak-sandwich.jpg", tag: "HOUSE FAVORITE" }
    ]
  },
  {
    id: "coffee",
    name: "قهوه",
    subtitle: "داغ / سرد / تخصصی",
    color: "#79c99e",
    image: "/images/categories/coffee.jpg",
    dishes: [
      { id: "flat-white", name: "فلت وایت", description: "اسپرسوی دوبل با شیر بخارداده‌شده و مخملی.", price: 4, image: "/images/dishes/flat-white.jpg", tag: "BARISTA PICK" },
      { id: "iced-matcha", name: "ماچا آیس", description: "ماچای مرغوب، شیر جو دوسر و یخ.", price: 5, image: "/images/dishes/iced-matcha.jpg" },
      { id: "cold-brew", name: "کلد برو", description: "قهوه دم‌سرد ۱۸ ساعته با طعمی نرم و شکلاتی.", price: 4, image: "/images/dishes/cold-brew.jpg" }
    ]
  },
  {
    id: "cocktails",
    name: "کوکتل",
    subtitle: "کلاسیک / امضای خانه / بدون الکل",
    color: "#252d34",
    image: "/images/categories/cocktails.jpg",
    dishes: [
      { id: "bitter-orange", name: "پرتقال تلخ", description: "پرتقال خونی، مرکبات و آب گازدار.", price: 11, image: "/images/dishes/bitter-orange.jpg" },
      { id: "garden-martini", name: "مارتینی باغ", description: "خیار، سبزی‌های تازه و ترکیب معطر خانه.", price: 13, image: "/images/dishes/garden-martini.jpg", tag: "HOUSE FAVORITE" },
      { id: "smoked-pineapple", name: "آناناس دودی", description: "آناناس گریل‌شده، لیمو و ادویه.", price: 12, image: "/images/dishes/smoked-pineapple.jpg" }
    ]
  }
];