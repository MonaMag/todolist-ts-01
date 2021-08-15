import React from 'react'
import App from './App';
import {Meta, Story} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";




export default {
    title: 'Todo List/AppWithUserState With Redux',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = (args) => <App {...args}/>

export const AppBaseExample = Template.bind({})
AppBaseExample.args = {
    demo: true
}