import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { removeSingleChannel, getChannel } from "../../store/channels";

const DeleteChannel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  // const notes = useSelector((state) => state.notes);
  // const note = notes[id]
  // const sessionUser = useSelector((state) => state.session.user)

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(removeSingleChannel(id))
    history.push("/servers")
  }

  useEffect(() => {
    dispatch(getChannel(id))
  }, [dispatch, id])

  return (
    <div className='modal'>
      <div className='form'>
        <form>
          <div className='exit-server-form'>
            <NavLink to='/servers'><div className='exit'>x</div></NavLink>
          </div>
          <div className="confirm-delete-text">
            Are you sure you want to delete this channel?
          </div>
          <div className="delete-button-div">
            <div className="confirm-delete-button">
              <button onClick={handleDeleteClick}>CONFIRM DELETE</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteChannel;
