import React from "react";
import styles from "./Contacts.module.css";


const Contacts = () => {
    
    return (
    <div className={styles["contain"]}>
      <div className={styles["wrapper"]}>
  <div className={styles["card"]}>
    <div className={styles["alg"]}><h1 >
            Address
          </h1></div>
          
          <p >
            Xpecto <br /> 
            SNTC, IIT Mandi <br />
            Kamand, Himachal Pradesh,
            INDIA</p>
  </div>
</div> 
<div className={styles["wrapper"]} >
  <div className={styles["card"]} >
  <h1 >
            Email
          </h1>
          <div className={styles["alg2"]}>
          <a href="mailto:team@xpecto.tech"><p>team@xpecto.tech</p></a>
          <a href="mailto:publicity@xpecto.tech"><p>publicity@xpecto.tech</p></a>
        
          </div>
          
  </div>
</div>
<div className={styles["wrapper"]}>
  <div className={styles["card"]}>
    <div>
    <div className="alg">
    <h1>
           Phone
          </h1>
    </div>
          
          <div >
          <a href="tel:7850084013">
									<p >
										Surendra: <span>+91 7850084013</span>
									</p></a>
					<a href="tel:9990991108"
									><p>
										Lalit: <span>+91 9990991108</span>
									</p></a>
					<a href="tel:7860688567"
									><p >
										Paras: <span>+91 7860688567</span>
									</p></a>
          </div>
    </div>
    
          
  </div>
</div>
 </div>
    )
};

export default Contacts;