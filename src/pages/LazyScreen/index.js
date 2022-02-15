import React, { Suspense, useEffect, useState } from 'react'
import ScreenLoading from './ScreenLoading'

const LazyScreen = ({ screen }) => {

    const Screen = React.lazy(() => import(`../${screen}`))

    const [initialized, setInitialized] = useState(false)
    
    useEffect(() => {
        setInitialized(true)
    }, [])

    if (!initialized) return null

    return (
        <Suspense fallback={<ScreenLoading />}>
            <Screen />
        </Suspense>
    )
}

export default LazyScreen