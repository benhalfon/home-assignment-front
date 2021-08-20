import PropTypes from 'prop-types'

const Header = ({ title }) => {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}

Header.defaultProps ={
    title: 'Alter Home Assignment'
}

Header.propTypes={
    title: PropTypes.string
}

export default Header
