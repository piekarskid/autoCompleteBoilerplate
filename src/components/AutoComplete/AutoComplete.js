import React, { useEffect, useState } from 'react';
import './AutoComplete.css'
import { searchUser, fetchUsers } from '../../actions/searchAction'
import { connect, useDispatch } from 'react-redux';

const AutoComplete = ({ text, users }) => {

  const [activeSuggection, setActiveSuggection] = useState(-1)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const onChange = (event) => {
    const inputValue = event.currentTarget.value

    dispatch(searchUser(inputValue))

    const filteredSuggestions = users.filter(user =>
      user.username.toUpperCase().substr(0, inputValue.length) === inputValue.toUpperCase()
    )

    setActiveSuggection(0)
    setFilteredSuggestions(filteredSuggestions)
    setShowSuggestions(true)
  }

  const handleSelect = () => {
    setActiveSuggection(0)
    setShowSuggestions(false)
    if (filteredSuggestions.length !== 0) dispatch(searchUser((filteredSuggestions[activeSuggection].username)))
    setFilteredSuggestions([])
  }

  const onKeyDown = (event) => {
    switch (event.keyCode) {
      case 13:
        handleSelect()
        break;
      case 40:
        return (activeSuggection + 1 === filteredSuggestions.length) ? null : setActiveSuggection(activeSuggection + 1)
      case 38:
        return (activeSuggection === 0) ? null : setActiveSuggection(activeSuggection - 1)
      default:
        break;
    }
  }

  return (
    <div className='autocomplete'>
      <input
        type='text'
        placeholder='Username'
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {showSuggestions && text
        ? (
          <div className='autocomplete-items'>
            {
              filteredSuggestions.map((user, index) => {
                let className = 'autocomplete-item'
                if (index === activeSuggection) className += ' autocomplete-item-active'

                return (
                  <div
                    key={user.id}
                    className={className}
                    onClick={handleSelect}
                  >
                    <strong>{user.username.substr(0, text.length)}</strong>
                    {user.username.substr(text.length)}
                  </div>
                )
              })
            }
          </div>
        )
        : null
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    text: state.users.text,
    users: state.users.users
  }
}

export default connect(mapStateToProps, {
  searchUser,
  fetchUsers
})(AutoComplete)