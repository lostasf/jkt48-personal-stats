const seats = [
  'C-19',
  'B-22',
  'A-14',
  'A-9',
  'G-9',
  'B-3',
  'C-20',
  'I-8',
  'I-16',
  'G-24',
  'F-10',
  'I-12',
  'E-7',
  'G-9',
  'G-11',
  'G-9',
  'G-5',
  'I-7',
  'B-11',
  'A-13',
  'H-13',
  'E-17',
  'C-16',
  'B-3',
  'H-2',
  'B-16',
  'E-26',
  'H-13',
  'I-10',
  'G-11',
  'H-22',
  'I-7',
  'E-21',
  'H-27',
  'E-26',
  'F-15',
  'H-6',
  'J-23',
  'J-9',
  'I-14',
  'E-26',
  'G-26',
  'A-6',
  'H-15',
  'C-5',
  'F-16',
  'F-11',
  'F-5',
  'F-20',
  'J-4',
  'H-13',
  'F-6',
  'H-1',
  'B-22',
  'G-21',
  'G-8',
  'E-19',
  'H-16',
  'F-6',
  'D-10',
  'I-5',
  'I-23',
  'J-11',
  'B-23',
  'E-7',
  'I-4',
  'B-6',
  'G-2',
  'J-5',
  'D-15',
  'F-25',
  'D-14',
  'F-11',
  'J-16',
  'H-19',
  'I-26',
  'G-23',
]

const countSeats = () => {
  const count = {}
  for (const seat in seats) {
    count[seats[seat]] = (count[seats[seat]] || 0) + 1
  }
  // sort it
  const sorted = Object.keys(count).sort((a, b) => {
    const [rowA, seatA] = a.split('-')
    const [rowB, seatB] = b.split('-')
    if (rowA === rowB) {
      return parseInt(seatA) - parseInt(seatB)
    }
    return rowA > rowB ? 1 : -1
  })
  return sorted.reduce((acc, key) => {
    acc[key] = count[key]
    return acc
  }, {})
}

const totalSeats = () => {
  return seats.length
}

export default {
  countSeats,
  totalSeats,
}
