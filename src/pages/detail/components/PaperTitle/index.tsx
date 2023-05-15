const styles = {
  titleBackground: {
    backgroundColor: '#dcdddf',
  },
  title: {
    color: '#528073',
    fontSize: '1.2rem',
    // fontWeight: "600",
    padding: 15,
  },
}

interface PaperTitleProps {
  title: string
}

export function PaperTitle(props: PaperTitleProps) {
  return (
    <div style={styles.titleBackground}>
      <div style={styles.title}>{props.title}</div>
    </div>
  )
}
