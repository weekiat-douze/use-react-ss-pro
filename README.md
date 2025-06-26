# Use React Screenshot Pro 

React hook that wraps [`html2canvas-pro`](https://github.com/yorickshan/html2canvas-pro), based on [`use-react-screenshot`](https://github.com/vre2h/use-react-screenshot)

- Written in TypeScript and uses [`html2canvas-pro`](https://github.com/yorickshan/html2canvas-pro) that has better support (e.g. with color functions)


## Installation
Dependencies — `html2canvas-pro` and `React`

```shell
npm install 
```


## Usage
The package comes with 2 functions, 
- `useScreenshot` hook that lets us capture screenshot and save into `image` variable.
- `triggerDownload` a convenience function to trigger download of the image.

```javascript
import { useScreenshot, triggerDownload } from 'use-react-ss-pro';

export default function component() {
    const ref = useRef<HTMLElement>(null); // Reference to DOM Element
    const [image, takeScreenshot] = useScreenshot("image/jpeg", 1); // Hook usage


    const getImage = async () => {
        const curImage = await takeScreenshot(ref.current); // Takes screenshot
        triggerDownload(curImage, "screenshot.jpeg"); // Triggers download of the image
    };

    return <div>
        <button onClick={getImage}>
            Take Screenshot
        </button>
        <div className="screenshot-target" ref={ref}> <!-- Attaching ref to element -->
            <p>It is for these reasons that I regard the decision last year to shift our efforts in space from low to high gear as among the most important decisions that will be made during my incumbency in the office of the Presidency.</p>
        </div>
    </div>
}

```
