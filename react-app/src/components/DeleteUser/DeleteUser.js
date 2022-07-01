import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { removeSingleUser } from "../../store/session";

const DeleteUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  console.log(user, "THIS IS USER ----------------------");

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(removeSingleUser(user.id))
    history.push(`/`)
  }

  return (
    <div className='modal'>
      <div className='form' onSubmit={handleSubmit}>
        <form>
          <div className='exit-server-form'>
            <NavLink to='/user-profile'><div className='exit'>x</div></NavLink>
          </div>
          <div className="confirm-delete-text">
            Are you sure you want to delete this user?
          </div>
          <div className="delete-button-div">
            <div className="confirm-delete-button">
              <button>CONFIRM DELETE</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


export default DeleteUser;
