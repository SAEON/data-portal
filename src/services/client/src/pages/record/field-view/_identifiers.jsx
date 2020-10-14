import React from 'react'
import Row from '../_row'
import { Typography } from '@material-ui/core'

export default ({ identifier, alternateIdentifiers }) => (
  <Row title="Identifiers">
    <div>
      <Typography variant="body2">
        <b>
          {identifier.identifierType.toUpperCase() === 'PLONE'
            ? 'SAEON'
            : identifier.identifierType.toUpperCase()}
        </b>{' '}
        {identifier?.identifier || 'Missing identifier'}
      </Typography>
    </div>
    {alternateIdentifiers
      ? alternateIdentifiers.map(ai => (
          <div key={ai.alternateIdentifier}>
            <Typography variant="body2">
              <b>
                {ai.alternateIdentifierType.toUpperCase() === 'PLONE'
                  ? 'SAEON'
                  : ai.alternateIdentifierType.toUpperCase()}
              </b>{' '}
              {ai.alternateIdentifier}
            </Typography>
          </div>
        ))
      : undefined}
  </Row>
)
