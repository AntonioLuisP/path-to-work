import React, { Suspense } from 'react'
import { useAuth } from '../hooks/useAuth'

import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import { CContainer, CFade } from '@coreui/react'

import {
  NosignalAlert,
} from '../reusable/'

import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Content = () => {

  const sinal = navigator.onLine
  const { authUser } = useAuth()

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => authUser ? (
                    <CFade>
                      {!sinal ? (<NosignalAlert />) :
                        <route.component {...props} />
                      }
                    </CFade>
                  ) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(Content)