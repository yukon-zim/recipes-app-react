import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    numberOfServings: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    dateCreated: PropTypes.string,
    dateModified: PropTypes.string,
    notes: PropTypes.string,
})