import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { removeSingleServer, getServer, getAllServers } from "../../store/servers";
import './DeleteServer.css'

const DeleteServer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const serverIdState = useSelector((state) => state.globalActions)
  const serverId = serverIdState.serverId


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(removeSingleServer(serverId))
    dispatch(getAllServers())
    history.push(`/servers/${serverId}`)
  }

  useEffect(() => {
    return () => {
      dispatch(getAllServers())
    }
  }, [dispatch])
  

  return (
    <div className='modal'>
      <div className='form' onSubmit={handleSubmit}>
        <form>
          <div className='exit-server-form'>
            <NavLink to='/servers/@me'><div className='exit'>x</div></NavLink>
          </div>
            <div className="confirm-delete-text">
              Are you sure you want to delete this server?
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


export default DeleteServer;
