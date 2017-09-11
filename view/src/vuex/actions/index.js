import baseActions from './base'
import musicActions from './music'
import userActions from './user'

export default {
  ...baseActions,
  ...musicActions,
  ...userActions
}
