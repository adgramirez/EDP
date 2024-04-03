import PropTypes from 'prop-types';

function DefaultButton({ label }) {
    return (
        <button className="default-button blue-button">{label}</button>
    );
}

DefaultButton.propTypes = {
    label: PropTypes.string.isRequired
};

export default DefaultButton;
