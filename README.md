# Zoma Coffee Roaster - Interactive Flavor Wheel

An interactive coffee flavor wheel built with React and D3.js for [Zoma Coffee Roaster](https://www.zomacoffeeroaster.com/). Explore the unique flavors of our premium Ethiopian coffees: Harrar, Sidamo, Yirgacheffe, and Guji.

**Crafting connections that go beyond the cup**

## Features

- 🎯 **Interactive Flavor Wheel**: Click on different flavor sections (fruity, nutty, floral, etc.) to explore coffee characteristics
- ☕ **Zoma Coffee Products**: Discover our Ethiopian coffees - Harrar, Sidamo, Yirgacheffe (Best Seller), and Guji
- 📝 **Tasting Notes**: Learn about the typical tasting notes for each flavor category
- 🍵 **Brewing Methods**: Get suggested brewing methods with ratios and timing for each flavor type
- ✍️ **Personal Tasting Journal**: Add your own tasting experiences with ratings and notes
- 🌱 **Our Commitment**: All our coffees are organic, fair trade, and sustainably sourced

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── FlavorWheel.js       # Interactive D3.js flavor wheel
│   ├── FlavorWheel.css
│   ├── CoffeeInfo.js        # Displays coffee information
│   ├── CoffeeInfo.css
│   ├── AddTastingForm.js    # Form for user tasting experiences
│   └── AddTastingForm.css
├── data/
│   └── coffeeData.js        # Coffee flavor data and examples
├── App.js                   # Main app component
├── App.css
├── index.js                 # Entry point
└── index.css
```

## Technologies Used

- **React** - UI framework
- **D3.js** - Interactive SVG visualization
- **CSS3** - Styling with gradients and animations

## Features in Detail

### Flavor Wheel
- Interactive pie chart visualization using D3.js
- Hover effects for better UX
- Click to select and explore flavors
- Responsive design

### Coffee Information Display
- Coffee examples for each flavor category
- Detailed tasting notes
- Multiple brewing method suggestions with:
  - Coffee to water ratios
  - Brewing time
  - Method descriptions

### Personal Tasting Journal
- Add your own coffee tasting experiences
- Rate coffees (1-5 stars)
- Save notes and dates
- View your tastings grouped by flavor

## About Zoma Coffee Roaster

Zoma Coffee Roaster is dedicated to delivering high-quality fair trade coffee beans with a focus on sustainability and organic practices. We offer our customers the opportunity to engage with fellow coffee enthusiasts in the Boston area through our events and resources.

**Our Values:**
- 🌱 **Organic**: Certified organic coffee beans
- 🤝 **Fair Trade**: Supporting ethical sourcing and fair wages
- ♻️ **Sustainable**: Committed to environmental responsibility

Visit us at [zomacoffeeroaster.com](https://www.zomacoffeeroaster.com/) - Free shipping on orders over $35!

## License

This project is created for Zoma Coffee Roaster.

