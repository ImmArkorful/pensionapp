import { formatDistanceToNow } from 'date-fns'
import { useAppState } from '../../context/AppStateContext'

export const NotificationsPanel = () => {
  const { notifications } = useAppState()

  return (
    <section className="panel notifications">
      <header className="panel-header">
        <div>
          <h3>Notifications & reminders</h3>
          <p>Stay on top of due dates, interest postings and updates</p>
        </div>
        <button className="link-btn">See all</button>
      </header>

      <ul>
        {notifications.slice(0, 4).map((item) => (
          <li key={item.id} className={`notification ${item.type}`}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
            <small>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</small>
          </li>
        ))}
      </ul>
    </section>
  )
}
