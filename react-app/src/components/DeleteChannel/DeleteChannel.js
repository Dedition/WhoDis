import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeSingleChannel, getChannel } from "../../store/channels";

const DeleteChannel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const currentServerId = useSelector((state) => state.globalActions)
  const serverId = currentServerId.serverId


  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(removeSingleChannel(serverId))
    history.push(`/servers/${serverId}`)
  }

  const [removeForm, setRemoveForm] = useState(true)
  const hideForm = () => {
    setRemoveForm(!removeForm)
  }


  
  useEffect(() => {
    dispatch(getChannel(id))
  }, [dispatch, id])

  return (
    <>
   
    <div className='modal'>
      <div className='form'>
            <form onSubmit={handleDeleteClick}>
          <div className='exit-server-form'>
            <div className='exit' onClick={() => setRemoveForm(!removeForm)}>x</div>
          </div>
          <div className="confirm-delete-text">
            Are you sure you want to delete this channel?
          </div>
          <div className="delete-button-div">
            <div className="confirm-delete-button">
              <button onClick={() => setRemoveForm(!removeForm)}>CONFIRM DELETE</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default DeleteChannel;
