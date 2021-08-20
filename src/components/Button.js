import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {

    return (
        <button className='btn' style={{background: color}} onClick={onClick}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'gray'
}

Button.propTypes={
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired

}

export default Button
