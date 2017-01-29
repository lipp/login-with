import React from 'react'

const KeyValueTable = ({flatObject}) => (
  <table className='breakable table'>
    <thead>
      <tr>
        <th>Name</th><th>Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(flatObject).map(key => (
        <tr key={key}>
          <td>{key}</td><td>{flatObject[key]}</td>
        </tr>
      ))}
    </tbody>
    <style jsx>{`
      .table {
        word-break: break-all;
      }
    `}</style>
  </table>
)

export default KeyValueTable
