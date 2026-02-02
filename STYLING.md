# Styling Guidelines

**Lessons learned from HomeTrace 2026-01-30**

---

## Button Styling

### ❌ Don't: Override with custom color classes

```tsx
// BAD - Custom classes may not be generated or have specificity issues
<Button className="bg-hometrace-gold hover:bg-hometrace-gold/90 text-white">Add Record</Button>
```

**Problems:**

- Tailwind JIT might not generate custom color classes
- CSS specificity conflicts with shadcn/ui component styles
- Buttons can appear invisible or with wrong colors

### ✅ Do: Use built-in variants and theme colors

```tsx
// GOOD - Use default variant (uses bg-primary from theme)
<Button asChild className="mt-4">
  <Link href="/records/new">Add Record</Link>
</Button>

// GOOD - Use explicit variants
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost Button</Button>
```

### Theme Configuration

Button colors come from CSS variables in `globals.css`:

```css
:root {
  --primary: oklch(0.32 0.09 160); /* Your brand color */
  --primary-foreground: oklch(0.98 0 0); /* Text on primary */
}
```

**Key insight:** Let shadcn/ui handle theming through CSS variables. Configure your brand colors in the theme, then use the built-in variants.

---

## Color Usage

### Brand Colors in Tailwind

If you define custom colors in `tailwind.config.ts`:

```ts
colors: {
  hometrace: {
    green: { DEFAULT: "var(--hometrace-green)" },
    gold: { DEFAULT: "var(--hometrace-gold)" },
  }
}
```

These work for **non-interactive elements** (text, borders, backgrounds on divs):

```tsx
<h1 className="text-hometrace-green">Title</h1>
<div className="border-hometrace-gold">...</div>
```

But for **interactive components** (Button, Input, etc.), use the theme system instead.

---

## Debugging Invisible Components

If a button or component appears invisible:

1. **Check DevTools** - Is the element there but no background?
2. **Check class generation** - Is Tailwind generating your custom classes?
3. **Try default styling** - Remove custom classes and use variants
4. **Check CSS variables** - Are they defined in globals.css?

---

_Last updated: 2026-01-30_
