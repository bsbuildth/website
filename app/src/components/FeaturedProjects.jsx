import React, { useState, useEffect } from 'react';
import './FeaturedProjects.css';

const CATEGORY_LABELS = {
  interior: 'ตกแต่งภายใน',
  exterior: 'ต่อเติมภายนอก',
  renovation: 'รีโนเวท'
};

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetch(`${apiUrl}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
        return res.json();
      })
      .then(data => { setProjects(data); setLoading(false); })
      .catch(err => { console.error('Failed to fetch projects:', err); setLoading(false); });
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const filteredProjects = (projects || []).filter(p => filter === 'all' || (p.category || 'renovation') === filter);

  const handleOpenDetail = async (project) => {
    setSelectedProject(project);
    setDetailLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/projects/${project.id}`);
      if (!res.ok) throw new Error(`Failed to fetch project details: ${res.status}`);
      const data = await res.json();
      setProjectDetail(data);
    } catch (err) {
      console.error('Error loading project details:', err);
      setProjectDetail(project);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setProjectDetail(null);
  };

  const getImgSrc = (img) =>
    img && img.startsWith('http') ? img : `${apiUrl}${img}`;

  return (
    <section className="featured-projects section" id="projects">
      <div className="container" data-aos="fade-up">
        <h2 className="section-title">Featured Projects</h2>

        <div className="project-filters">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>ทั้งหมด</button>
          <button className={`filter-btn ${filter === 'interior' ? 'active' : ''}`} onClick={() => setFilter('interior')}>ตกแต่งภายใน</button>
          <button className={`filter-btn ${filter === 'exterior' ? 'active' : ''}`} onClick={() => setFilter('exterior')}>ต่อเติมภายนอก</button>
          <button className={`filter-btn ${filter === 'renovation' ? 'active' : ''}`} onClick={() => setFilter('renovation')}>รีโนเวท</button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading projects...</p>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div className="project-card" key={project.id} data-aos="zoom-in" data-aos-duration="500" onClick={() => handleOpenDetail(project)} style={{ cursor: 'pointer' }}>
                <div className="project-img-wrapper">
                  <img src={getImgSrc(project.img)} alt={project.title} className="project-img" />
                  <div className="project-overlay">
                    <span className="project-btn">ดูรายละเอียด</span>
                  </div>
                </div>
                <div className="project-info">
                  <span style={{ fontSize: '0.75rem', background: project.category === 'interior' ? '#e8f5e9' : project.category === 'exterior' ? '#e3f2fd' : '#fce4ec', color: '#555', padding: '0.15rem 0.5rem', borderRadius: 10, marginBottom: '0.3rem', display: 'inline-block' }}>
                    {CATEGORY_LABELS[project.category] || 'รีโนเวท'}
                  </span>
                  <h3 className="project-title">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={handleCloseModal}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <button className="project-modal-close" onClick={handleCloseModal}>✕</button>

            <div className="project-modal-hero">
              <img src={getImgSrc(selectedProject.img)} alt={selectedProject.title} />
              <span className="project-modal-category">
                {CATEGORY_LABELS[selectedProject.category] || 'รีโนเวท'}
              </span>
            </div>

            <div className="project-modal-body">
              <h2 className="project-modal-title">{selectedProject.title}</h2>

              {detailLoading ? (
                <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>กำลังโหลด...</p>
              ) : (
                <>
                  {projectDetail?.description && (
                    <div className="project-modal-description">
                      <h4>รายละเอียดโครงการ</h4>
                      <p>{projectDetail.description}</p>
                    </div>
                  )}

                  {projectDetail?.process_images?.length > 0 && (
                    <div className="project-modal-process">
                      <h4>ภาพระหว่างดำเนินการ</h4>
                      <div className="process-images-grid">
                        {projectDetail.process_images.map(img => (
                          <div key={img.id} className="process-image-item">
                            <img src={getImgSrc(img.img_path)} alt={img.caption || 'ระหว่างดำเนินการ'} />
                            {img.caption && <p>{img.caption}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!projectDetail?.description && !projectDetail?.process_images?.length && (
                    <p style={{ color: '#888', textAlign: 'center', padding: '1rem 0' }}>ยังไม่มีรายละเอียดเพิ่มเติม</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;

