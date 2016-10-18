# Cubit

[**kyoo**-bit] noun

1. an ancient linear unit based on the length of the forearm, from elbow to the tip of the middle finger.
2. a JavaScript library that helps to abstract media queries (concrete measurements) out of your stylesheets.

## Concept
- Style using arbitrary classes like `.lg` instead of `@media`. `getComputedStyle` magic allows media queries still power when the class updates.
- Declare your breakpoints once the page loads, and update them in realtime whenever you like (i.e. per page optimzations). A dynamic stylesheet is generated and updated as breakpoints are configured.
- Keep concrete breakpoint values out of your stylesheets. And truly so, meaning without a preprocessor!


## Usage

Include `cubit.js` anywhere in your `<head>` and specify your desired breakpoints using `data-cubit` like so:

```html
<script src="cubit.js" data-cubit='
  {
    "xl" : "(min-width: 1401px)",
    "lg" : "(min-width: 1001px) and (max-width: 1400px)",
    "md" : "(min-width: 701px) and (max-width: 1000px)",
    "sm" : "(min-width: 481px) and (max-width: 700px)",
    "xs" : "(max-width: 480px)"
  }
'></script>
```

Note that the included `example.html` file provides a minified inline version elimiating the extra http request. 

`data-cubit` should contain a JSON object with name/value pairs of CSS class names that correlate to a desired breakpoint. Using the example above, the class `xl` would be applied to the `<html>` element when the user's viewport is at least `1401px` wide. Once Cubit is running you no longer need to write concrete media queries within your stylesheets, allowing you to change this:

```css
.el {
  font-size: 1rem;
}

@media (min-width: 1401px) {
  .el {
    font-size: 1.5rem;
  }
}
```

To this:

```css
.el {
  font-size: 1rem;
}

.xl .el {
  font-size: 1.5rem;
}
```

#### Getting crazy with it: Change your breakpoints on the fly

Adding the `data-cubit-expose-api` attribute to your `script` tag will expose the `setBreakpoints` function to the `window`. 

```html
<script src="cubit.js" data-cubit='initial json' data-cubit-expose-api></script>
```

Calling `setBreakpoints` with a javascript object formatted similar to the initial JSON will update the breakpoints used to determine when classes switch:

```js
setBreakpoints({
    xl: "(min-width: 1801px)",
    lg: "(min-width: 1201px) and (max-width: 1800px)",
    md: "(min-width: 1001px) and (max-width: 1200px)",
    sm: "(min-width: 481px) and (max-width: 1000px)",
    xs: "(max-width: 480px)"
})
```

## Resources

- [Blog Post](http://theme.co/blog/cubit-a-more-flexible-media-query/) &ndash; For a more in-depth rundown on why we made Cubit.
- [Playground](http://theme.co/playground/cubit/) &ndash; Be a kid again, have some fun!

## Contributing

We would love to hear your thoughts on Cubit! If you have any questions or ideas on how to improve the codebase, don't hesitate to jump in and wrangle some code with us.
