import PropTypes from 'prop-types';

export default PropTypes.shape({
    // id should be included when working with recipe data
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    numberOfServings: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    dateCreated: PropTypes.string,
    dateModified: PropTypes.string,
    notes: PropTypes.string,
})