import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { editSingleServer, getServer } from '../../store/servers';


const EditServerForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [banner_url, setBannerUrl] = useState("");
  const [server_icon_url, setServerIconUrl] = useState("");
  const dm_channel = false;
  const [notPrivate, setNotPrivate] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.session.user?.id)
  const serverIdState = useSelector((state) => state.globalActions)
  const serverId = serverIdState.serverId
  const owner_id = currentUserId;

  // const { serverId } = useParams();

  const reset = () => {
    setName('');
    setBannerUrl('');
    setServerIconUrl('');
    setNotPrivate(false);
  }

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      name,
      banner_url,
      server_icon_url,
      notPrivate,
      dm_channel,
      owner_id,
    };
    const updatedServer = dispatch(editSingleServer(serverId, data));
    if (updatedServer) {
      history.push(`/servers/${serverId}`);
      reset();
    }
  }

  return (
    <div className='modal'>
      <div className='form'>
        <form onSubmit={submitForm}>
          <div className='exit-server-form'>

            <NavLink to='/servers/@me'><div className='exit'>x</div></NavLink>
          </div>

          <div className='create-text'>Edit Server!</div>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='banner_url'>Banner Img</label>
            <input
              name="banner_url"
              type="text"
              placeholder="Banner Img"
              value={banner_url}
              onChange={(e) => setBannerUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="server_icon_url">Server Icon Img</label>
            <input
              name="server_icon_url"
              type="text"
              placeholder="Server Icon Img"
              value={server_icon_url}
              onChange={(e) => setServerIconUrl(e.target.value)}
              required
            />
          </div>
          <div className='public-private'>
            <label htmlFor="public">
              Public
              <input
                type="checkbox"
                value="no"
                name="public"
                checked={notPrivate === 'no'}
                onChange={(e) => setNotPrivate('no')}
              />
            </label>
            <label htmlFor="public">
              Private
              <input
                type="checkbox"
                value="yes"
                name="public"
                checked={notPrivate === 'yes'}
                onChange={(e) => setNotPrivate('yes')}
              />
            </label>
          </div>
          <div>
            <button type="submit">
              Edit
            </button>
          </div>
        </form>
      </div>

      {/* animation */}
      {/* <div class="left">
        <div class="cat">
          <div class="ears1"></div>
          <div class="head1">
            <div class="eyes1"></div>
            <div class="nose1"></div>
          </div>
          <div class="body1">
            <div class="left-paw1"></div>
            <div class="right-paw1"></div>
          </div>
          <div class="tail1"></div>
          <div class="PRlaptop">
            <div class="PRscreen"></div>
            <div class="PRkeyboard"></div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="dog">
          <div class="ears2"></div>
          <div class="head2">
            <div class="eyes2"></div>
            <div class="nose2"></div>
          </div>
          <div class="body2">
            <div class="left-paw2"></div>
            <div class="right-paw2"></div>
          </div>
          <div class="tail2"></div>
          <div class="ORlaptop">
            <div class="ORscreen"></div>
            <div class="ORkeyboard"></div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default EditServerForm;
