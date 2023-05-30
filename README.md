# pigment-picker
Pigment Picker is a versatile and customizable color picker React component package. It provides an intuitive and user-friendly interface for selecting colors and integrates seamlessly into your React applications. This package is useful if you're building a design tool, an image editor, or any application that requires color selection.

## 🚀 Features
- **Simple and Easy to Use**: Pigment Picker offers simple components, making it effortless to integrate into your React application.

- **Responsiveness**: Pigment Picker adapts to different screen sizes and orientations, providing a consistent user experience.

- **[🛠In Development] Customizable**: Customize the appearance and behavior of the color picker to suit your application's needs.

- **[🛠In Development] Supports Different Color Formats**: Pigment Picker supports various color formats, including HEX, RGB, and HSL, providing flexibility for color representation.
  
- **[🛠In Development] Color Palettes / Swatches**: Easily add color swatches or predefined color palettes for quick color selection.

## 📦 Installation
You can install pigment-picker using npm:

```bash
npm install pigment-picker`
```

## 🔨 Usage

```jsx
import React, { useState } from 'react';
import { ColorPicker } from 'pigment-picker';

const App = () => {

    const [color, setColor] = useState({red:255, green:255, blue:255});

    return (<>
        <ColorPicker selectHandler={setColor} />
        <div id=""
            style={{backgroundColor:`rgb(${color.red},${color.green},${color.blue})`,
                    width:"fit-content"}}
            >🔎 color preview</div>
    </>)
}
```

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)