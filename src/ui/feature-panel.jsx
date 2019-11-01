import React from 'react'
import { Card, Toolbar, CardText } from 'react-md'

export default ({ title, footerActions, toolbarActions, children }) => (
  <Card style={{ height: '100%', width: '100%' }} className="better-box-shadow">
    <Toolbar colored title={title} actions={toolbarActions} />
    <CardText style={{ height: 'calc(100% - 86px)' }}>{children}</CardText>
    <Toolbar style={{ fontSize: '12px', height: '24px' }} actions={footerActions} colored />
  </Card>
)
