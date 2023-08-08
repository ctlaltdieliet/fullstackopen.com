import { useSelector, } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector((state) => state.users)
    users.map((user) => {
        return (
            <tr key={user.id}>
                <td>
                    <Link to={`/user/${user.id}`}> {user.name}</Link>
                </td>
                <td>
                    <strong>{user.blogs.length}</strong>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <h2>Users</h2>
            <table border="0">
                <tbody>
                    <tr>
                        <td />
                        <td>
                            {' '}
                            <strong>Blogs created</strong>
                        </td>
                    </tr>
                    {[...users].map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/user/${user.id}`}>
                                    {' '}
                                    {user.name}
                                </Link>
                            </td>
                            <td>
                                <strong>{user.blogs.length}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
