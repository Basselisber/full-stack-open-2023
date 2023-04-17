const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  }
  
  const Content = ({parts}) => {
    return (
    <div>
      {parts.map(part => (
        <Part key = {part.id} part={part} />))}
    </div>
  
  )}
  const Header = ({ heading }) =>  <h1>{heading}</h1>
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <p><strong>total of {total} exercises</strong></p>
    )
  }
  
  const Courses = ({courses}) => {
    return(
      <>
        <h1>Web development curriculum</h1>
        {courses.map(course => (
          <div key = {course.id}>
            <Header heading={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </>
    )}

export default Courses;  