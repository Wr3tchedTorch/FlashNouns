import "./index.scss";

const Help = () => {
  return (
    <section id="help">
      <img src="/public/help/blob_01.png" alt="" className="blob-01"/>

      <img src="/public/help/wave.svg" alt="" />
      <div>
        <h1>Hints</h1>
        <p>To determine the gender of a noun, you can often rely on its category or ending. Below, you will find charts to assist you in identifying these patterns. For a more in-depth understanding, we highly recommend reading this article.</p>
      </div>

      <div>
        <h1>Noun Endings</h1>
        <img src="/public/help/chart_01.png" alt="" />
        <p>source: <a href="#">https://germanwithlaura.com/noun-gender</a></p>
      </div>

      <div>
        <h1>Noun Groups</h1>
        <img src="/public/help/chart_02.png" alt="" />
        <p>source: <a href="#">https://germanwithlaura.com/noun-gender</a></p>
      </div>

      <div>
        <h1>About</h1>
        <p>This website is designed to help users effectively memorize the genders of German nouns by categorizing them into groups and identifying patterns based on their endings. Our method is inspired by the innovative approach outlined in one of Laura’s insightful articles. By leveraging these techniques, you can significantly improve your ability to recall noun genders, enhancing your overall proficiency in German.</p>
      </div>

      <img src="/public/help/blob_02.png" alt="" className="blob-02"/>
    </section>
  )
}

export default Help
