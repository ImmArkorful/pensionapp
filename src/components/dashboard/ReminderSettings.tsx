import { useAppState } from '../../context/AppStateContext'

export const ReminderSettings = () => {
  const { reminders, toggleReminder } = useAppState()

  return (
    <section className="panel reminders">
      <header className="panel-header">
        <div>
          <h3>Reminder schedule</h3>
          <p>Customize when to be notified for debits and updates</p>
        </div>
      </header>

      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            <div>
              <strong>{reminder.label}</strong>
              <p>{reminder.timing}</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={reminder.active} onChange={() => toggleReminder(reminder.id)} />
              <span />
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
