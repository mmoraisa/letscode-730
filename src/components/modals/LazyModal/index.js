import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import ModalLoading from './ModalLoading'

const LazyModal = ({ initialized, Modal }) => {

    if (!initialized) return null

    return (
        <Suspense fallback={<ModalLoading />}>
            <Modal />
        </Suspense>
    )
}

LazyModal.propTypes = {
    initialized: PropTypes.bool.isRequired,
    Modal: PropTypes.elementType.isRequired,
}

export default LazyModal