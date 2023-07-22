import type { ComponentStory, Meta } from '@storybook/react';

import { Demo } from './demos/useCopy';
import Document from './mdx/useClickOutside.mdx';

const meta: Meta = {
  title: 'Hooks/useClickOutside',
  component: undefined,
  argTypes: {
    length: {
      control: {
        type: 'number',
      },
      defaultValue: 10,
    },
  },
  parameters: {
    controls: { expanded: true },
    docs: {
      page: Document,
    },
  },
};

export default meta;

const Template: ComponentStory<any> = () => <Demo />;
export const Default = Template.bind({});
Default.args = {};
