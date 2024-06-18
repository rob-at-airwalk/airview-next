// Menu.stories.tsx
import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import type { HeaderMinimalMenuProps } from './HeaderMinimalMenu';
import { HeaderMinimalMenu } from './HeaderMinimalMenu';

export default {
  title: 'Menus/HeaderMinimalMenu',
  component: HeaderMinimalMenu,
} as Meta;

const Template: StoryFn<HeaderMinimalMenuProps> = (args) => (
  <HeaderMinimalMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  menu: [
    {
      label: 'Home',
      url: '/',
      menuItems: [
        {
          groupTitle: 'Submenu',
          links: [
            {
              label: 'Submenu 1',
              url: '/submenu1',
            },
            {
              label: 'Submenu 2',
              url: '/submenu2',
            },
          ],
        },
      ],
    },
    {
      label: 'About',
      url: '/about',
      menuItems: [
        {
          links: [
            {
              label: 'Submenu 1',
              url: '/submenu1',
            },
            {
              label: 'Submenu 2',
              url: '/submenu2',
            },
          ],
        },
      ],
    },
  ],
  open: true,
  top: 0,
  drawerWidth: 240,
  collapsible: true,
  initialCollapsed: false,
};

export const Providers = Template.bind({});
Providers.args = {
  menu: [
    { label: 'Test Service 1', url: 'services/test_1_service/_index.md' },
    {
      label: 'Test 2 Service',
      url: 'services/test_2_service/_index.mdx',
      menuItems: [
        {
          groupTitle: 'Chapters',
          links: [
            {
              label: 'Test 2 content',
              url: 'services/test_2_service/blah.mdx',
            },
          ],
        },
      ],
    },
  ],
  open: true,
  top: 0,
  drawerWidth: 240,
  collapsible: true,
  initialCollapsed: true,
};