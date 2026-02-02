import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../context/AppStateContext'

export const NextOfKinCard = () => {
  const { user } = useAppState()
  const navigate = useNavigate()
  if (!user) return null

  return (
    <section className="panel next-of-kin">
      <header className="panel-header">
        <div>
          <h3>Next of kin</h3>
          <p>Update anytime from settings</p>
        </div>
        <button className="link-btn" type="button" onClick={() => navigate('/dashboard/settings#next-of-kin')}>
          Change
        </button>
      </header>

      <div className="kin-details">
        <strong>{user.nextOfKin.name}</strong>
        <p>{user.nextOfKin.relationship}</p>
        <p>{user.nextOfKin.phone}</p>
      </div>
    </section>
  )
}
