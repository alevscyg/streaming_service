import type { Meta, StoryObj } from '@storybook/react';
import TabBarLinkUI from './TabBarLinkUI';
import './TabBarLinkUI.module.scss';
import homeIcon from '../../../../../public/icons/tabbar_icons/home.svg';

const meta: Meta<typeof TabBarLinkUI> = {
    title: 'Links/TabBarLink',
    component: TabBarLinkUI,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'dark' },
    },
};

export default meta;

type Story = StoryObj<typeof TabBarLinkUI>;

export const TabBarItem: Story = {
    args: {
        href: 'https://www.ivi.ru/',
        icon: homeIcon,
        text: 'Мой Иви',
    },
};
