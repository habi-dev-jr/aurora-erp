import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import { DocumentTitleProps } from '../types/components';

const DocumentTitle = ({title}: DocumentTitleProps) => {
    return (
        <Helmet>
            <title>{title} | React E-commerce Dashboard Template</title>
        </Helmet>
    )
}

DocumentTitle.propTypes = {
    title: PropTypes.string.isRequired
}

export default DocumentTitle