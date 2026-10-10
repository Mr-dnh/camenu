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

// Replace the placeholder files in public/images with your own food photography.
// Keep the same filenames to avoid changing any code.
export const menuCategories: MenuCategory[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    subtitle: "A slow start, done right",
    color: "#f4c995",
    image: "/images/categories/breakfast.jpg",
    dishes: [
      { id: "sunrise-plate", name: "The Sunrise Plate", description: "Soft eggs, grilled sourdough, herbed labneh and seasonal greens.", price: 12, image: "/images/dishes/sunrise-plate.jpg", tag: "HOUSE FAVORITE" },
      { id: "ricotta-pancakes", name: "Ricotta Pancakes", description: "Fluffy pancakes, whipped ricotta, berries and warm maple.", price: 10, image: "/images/dishes/ricotta-pancakes.jpg" },
      { id: "avocado-toast", name: "Avocado Toast", description: "Smashed avocado, lemon, chili oil and toasted country bread.", price: 9, image: "/images/dishes/avocado-toast.jpg", tag: "VEGETARIAN" }
    ]
  },
  {
    id: "pasta",
    name: "Pasta",
    subtitle: "Made for the long lunch",
    color: "#f2eee8",
    image: "/images/categories/pasta.jpg",
    dishes: [
      { id: "truffle-tagliatelle", name: "Truffle Tagliatelle", description: "Fresh ribbons of pasta, wild mushrooms and parmesan.", price: 18, image: "/images/dishes/truffle-tagliatelle.jpg", tag: "HOUSE FAVORITE" },
      { id: "spicy-rigatoni", name: "Spicy Rigatoni", description: "Slow tomato, cream, chili and aged pecorino.", price: 16, image: "/images/dishes/spicy-rigatoni.jpg" },
      { id: "lemon-linguine", name: "Lemon Linguine", description: "Bright lemon butter, parsley, black pepper and parmesan.", price: 15, image: "/images/dishes/lemon-linguine.jpg", tag: "VEGETARIAN" }
    ]
  },
  {
    id: "pizza",
    name: "Pizza",
    subtitle: "A little crisp around the edges",
    color: "#eea052",
    image: "/images/categories/pizza.jpg",
    dishes: [
      { id: "margherita", name: "Margherita", description: "San Marzano tomato, fior di latte, basil and olive oil.", price: 14, image: "/images/dishes/margherita.jpg", tag: "CLASSIC" },
      { id: "hot-honey", name: "Hot Honey", description: "Pepperoni, mozzarella, pickled chili and hot honey.", price: 17, image: "/images/dishes/hot-honey.jpg" },
      { id: "wild-mushroom-pizza", name: "Wild Mushroom", description: "Roasted mushrooms, thyme, taleggio and garlic oil.", price: 16, image: "/images/dishes/wild-mushroom-pizza.jpg", tag: "VEGETARIAN" }
    ]
  },
  {
    id: "lunch",
    name: "Lunch",
    subtitle: "Something worth stepping out for",
    color: "#f3edf0",
    image: "/images/categories/lunch.jpg",
    dishes: [
      { id: "crispy-chicken", name: "Crispy Chicken", description: "Buttermilk chicken, shaved cabbage and house pickles.", price: 16, image: "/images/dishes/crispy-chicken.jpg" },
      { id: "market-bowl", name: "Market Bowl", description: "Seasonal vegetables, grains, herbs and tahini dressing.", price: 13, image: "/images/dishes/market-bowl.jpg", tag: "VEGETARIAN" },
      { id: "steak-sandwich", name: "Steak Sandwich", description: "Sliced steak, caramelized onion and peppery greens.", price: 19, image: "/images/dishes/steak-sandwich.jpg", tag: "HOUSE FAVORITE" }
    ]
  },
  {
    id: "coffee",
    name: "Coffee",
    subtitle: "Stay for one more",
    color: "#72cda5",
    image: "/images/categories/coffee.jpg",
    dishes: [
      { id: "flat-white", name: "Flat White", description: "Double espresso with silky steamed milk.", price: 4, image: "/images/dishes/flat-white.jpg", tag: "BARISTA PICK" },
      { id: "iced-matcha", name: "Iced Matcha", description: "Ceremonial matcha, oat milk and a little ice.", price: 5, image: "/images/dishes/iced-matcha.jpg" },
      { id: "cold-brew", name: "Cold Brew", description: "Slow-steeped for 18 hours, smooth and chocolatey.", price: 4, image: "/images/dishes/cold-brew.jpg" }
    ]
  },
  {
    id: "cocktails",
    name: "Cocktails",
    subtitle: "Golden hour, any hour",
    color: "#252d34",
    image: "/images/categories/cocktails.jpg",
    dishes: [
      { id: "bitter-orange", name: "Bitter Orange", description: "Blood orange, bitter aperitif, citrus and sparkling water.", price: 11, image: "/images/dishes/bitter-orange.jpg" },
      { id: "garden-martini", name: "Garden Martini", description: "Gin, dry vermouth, cucumber and fresh herbs.", price: 13, image: "/images/dishes/garden-martini.jpg", tag: "HOUSE FAVORITE" },
      { id: "smoked-pineapple", name: "Smoked Pineapple", description: "Charred pineapple, lime, spice and a smoky finish.", price: 12, image: "/images/dishes/smoked-pineapple.jpg" }
    ]
  }
];