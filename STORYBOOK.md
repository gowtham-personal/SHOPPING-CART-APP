# Storybook Setup Documentation

This project includes a complete Storybook setup for developing, testing, and documenting React components.

## 🚀 Quick Start

```bash
# Start Storybook development server
yarn storybook

# Build Storybook for production
yarn build-storybook
```

Storybook will run on `http://localhost:6006`

## 📁 Project Structure

```
.storybook/
├── main.ts          # Main Storybook configuration
└── preview.ts       # Global settings and decorators

src/
├── stories/
│   └── Introduction.mdx    # Welcome documentation
└── components/bricks/
    └── [Component]/
        ├── index.tsx
        ├── index.test.tsx
        └── index.stories.tsx   # Component stories
```

## 🧰 Installed Packages

- `storybook@8.3.5` - Core Storybook framework
- `@storybook/react@8.3.5` - React integration
- `@storybook/react-vite@8.3.5` - Vite builder integration
- `@storybook/addon-essentials@8.3.5` - Essential addons bundle
- `@storybook/addon-links@8.3.5` - Navigation between stories

## ⚙️ Configuration

### Main Configuration (`.storybook/main.ts`)

- **Stories**: Automatically discovers `*.stories.tsx` files in `src/`
- **Framework**: React + Vite for fast development
- **TypeScript**: Full TypeScript support with React docgen
- **Addons**: Essential addons for controls, actions, docs, etc.

### Preview Configuration (`.storybook/preview.ts`)

- **Tailwind CSS**: Imported for consistent styling
- **Global Parameters**: Background options, viewport settings
- **Controls**: Automatic prop detection and controls generation

## 📖 Writing Stories

Create stories following this pattern:

```typescript
// src/components/bricks/[Component]/index.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { [Component] } from './index';

const meta = {
  title: 'Bricks/[Component]',
  component: [Component],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define prop controls
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof [Component]>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

## 🎯 Best Practices

### Story Organization
- Use descriptive story names
- Group related variations
- Include edge cases and error states
- Provide interactive controls for all props

### Documentation
- Add JSDoc comments to components
- Use `argTypes` for prop descriptions
- Include usage examples in stories
- Document accessibility features

### Testing Integration
- Stories serve as visual tests
- Use Storybook for component development
- Complement with Jest unit tests
- Test responsive behavior with viewport addon

## 🔧 Customization

### Adding New Addons
```bash
yarn add -D @storybook/addon-[name]@8.3.5
```

Then add to `.storybook/main.ts`:
```typescript
addons: [
  '@storybook/addon-[name]',
  // ... other addons
],
```

### Global Decorators
Add project-wide decorators in `.storybook/preview.ts`:
```typescript
export const decorators = [
  (Story) => (
    <div className="custom-wrapper">
      <Story />
    </div>
  ),
];
```

### Custom Themes
Modify backgrounds, viewports, and other global settings in the preview configuration.

## 🌐 Deployment

### Build for Production
```bash
yarn build-storybook
```

This creates a `storybook-static/` directory that can be deployed to any static hosting service.

### Recommended Hosting
- **Netlify**: Automatic deployments from Git
- **Vercel**: Seamless integration with Git workflows
- **GitHub Pages**: Free hosting for open source projects
- **Chromatic**: Visual testing and review workflows

## 🔍 Troubleshooting

### Version Compatibility
Ensure all Storybook packages use the same version (8.3.5). Check with:
```bash
yarn list | grep storybook
```

### Vite Configuration
If you encounter Vite-related issues, ensure your Vite version is compatible (^7.0.0).

### TypeScript Issues
- Restart TypeScript server in your editor
- Check `.storybook/main.ts` for proper type imports
- Ensure all components have proper TypeScript definitions

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [React + Storybook Guide](https://storybook.js.org/docs/react/get-started/introduction)
- [Addon Documentation](https://storybook.js.org/docs/react/addons/introduction)
- [Best Practices](https://storybook.js.org/docs/react/writing-stories/introduction)

---

✨ **Happy Storybooking!** Your component library is ready for development. 