import React, { useState, useEffect } from 'react';
import { getCalculatorTypes } from '../firebase/api';
import './Calculator.css';

const Calculator = () => {
  const [calculatorTypes, setCalculatorTypes] = useState([]);
  const [projectTypeId, setProjectTypeId] = useState(null);
  const [area, setArea] = useState('');
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await getCalculatorTypes();
        setCalculatorTypes(data);
        if (data.length > 0) {
          setProjectTypeId(data[0].id);
        }
      } catch (err) {
        console.error('Error fetching calculator types:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  const handleCalculate = () => {
    if (!area || isNaN(area) || area <= 0) {
      alert('Please enter a valid area');
      return;
    }

    const selectedType = calculatorTypes.find(t => t.id === projectTypeId);
    if (!selectedType) {
      alert('Please select a project type');
      return;
    }

    const basePrice = selectedType.base_price;
    const minPrice = Math.floor(basePrice * area * 0.9);
    const maxPrice = Math.floor(basePrice * area * 1.2);

    setEstimate({
      min: minPrice,
      max: maxPrice,
    });
  };


  if (loading) {
    return (
      <section className="calculator section" id="calculator">
        <div className="container">
          <div className="calc-wrapper">
            <div className="calc-info">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text" style={{width: '80%'}}></div>
              <div className="skeleton skeleton-text" style={{width: '60%'}}></div>
            </div>
            <div className="calculator-form">
              <div className="skeleton skeleton-input"></div>
              <div className="skeleton skeleton-input"></div>
              <div className="skeleton skeleton-btn"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="calculator section" id="calculator">
      <div className="container" data-aos="fade-up">
        <div className="calc-wrapper">
          <div className="calc-info">
            <h2 className="section-title text-left">AI ESTIMATE CALCULATOR</h2>
            <p className="text-muted">ระบบประเมินราคาอัจฉริยะเบื้องต้น ช่วยให้คุณวางแผนงบประมาณได้อย่างแม่นยำ เพียงกรอกข้อมูลพื้นฐาน ระบบจะคำนวณช่วงราคาที่เป็นไปได้ให้ทันที</p>
            <ul className="text-muted">
              <li>✓ ประเมินผลรวดเร็วแบบ Real-time</li>
              <li>✓ อ้างอิงราคาจากฐานข้อมูลวัสดุปี 2026</li>
            </ul>
          </div>
          <div className="calculator-form">
            <div className="calc-form-group">
              <label>ประเภทงาน</label>
              <select value={projectTypeId || ''} onChange={e => setProjectTypeId(e.target.value)}>
                {calculatorTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.type_name}</option>
                ))}
              </select>
            </div>

            <div className="calc-form-group">
              <label>ขนาดพื้นที่ (ตร.ม.)</label>
              <input
                type="number"
                placeholder="เช่น 50"
                value={area}
                onChange={e => setArea(e.target.value)}
              />
            </div>

            <button onClick={handleCalculate} className="btn btn-solid">
              ประเมินราคา
            </button>
          </div>

          {estimate && (
            <div className="calculator-result calculator-result-split">
              <div>
                <h3>ราคาประมาณ (บาท)</h3>
                <div className="price-range">
                  <span className="price-min">{estimate.min.toLocaleString('th-TH')}</span>
                  <span className="price-sep">-</span>
                  <span className="price-max">{estimate.max.toLocaleString('th-TH')}</span>
                </div>
                <p className="disclaimer">*ราคาประเมินเบื้องต้น อาจเปลี่ยนแปลงตามหน้างานจริง</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;

