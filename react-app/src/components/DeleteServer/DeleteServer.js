import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { removeSingleServer, getServer } from "../../store/servers";
import './DeleteServer.css'

const DeleteServer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  // const notes = useSelector((state) => state.notes);
  // const note = notes[id]
  // const sessionUser = useSelector((state) => state.session.user)

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(removeSingleServer(id))
    history.push("/servers")
  }

  useEffect(() => {
    dispatch(getServer(id))
  }, [dispatch, id])

  return (
    <div className='modal'>
      <div className='form'>
        <form>
          <div className='exit-server-form'>
            <NavLink to='/servers'><div className='exit'>x</div></NavLink>
          </div>
            <div className="confirm-delete-text">
              Are you sure you want to delete this server?
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


export default DeleteServer;
