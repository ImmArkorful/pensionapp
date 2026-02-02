import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useAppState } from '../../context/AppStateContext'

export const NotificationsPanel = () => {
  const { notifications } = useAppState()
  const [showAll, setShowAll] = useState(false)

  const visibleNotifications = showAll ? notifications : notifications.slice(0, 4)

  return (
    <section className="panel notifications">
      <header className="panel-header">
        <div>
          <h3>Notifications & reminders</h3>
          <p>Stay on top of due dates, interest postings and updates</p>
        </div>
        {notifications.length > 4 && (
          <button className="link-btn" type="button" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? 'View less' : 'View all notifications'}
          </button>
        )}
      </header>

      <ul>
        {visibleNotifications.map((item) => (
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
