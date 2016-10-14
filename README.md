# Cubit

[**kyoo**-bit] noun

1. an ancient linear unit based on the length of the forearm, from elbow to the tip of the middle finger.
2. a JavaScript library that helps to abstract media queries (concrete measurements) out of your stylesheets.

## Resources

- [Blog Post](http://theme.co/blog/cubit-a-more-flexible-media-query/) &ndash; For a more in-depth rundown on why we made Cubit.
- [Playground](http://theme.co/playground/cubit/) &ndash; Be a kid again, have some fun!

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

## Contributing

We would love to hear your thoughts on Cubit! If you have any questions or ideas on how to improve the codebase, don't hesitate to jump in and wrangle some code with us.