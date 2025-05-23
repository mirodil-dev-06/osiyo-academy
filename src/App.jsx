import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validatsiya
    if (!formData.name.trim() || !formData.phone.trim() || !formData.course) {
      toast.error('Iltimos, barcha maydonlarni to‘ldiring!')
      return
    }

    const telegramBotId = '7714726464:AAFmEHotdot0PV_yOztC9WBiNN4NuvdlZt4'
    const chatId = '2116122699'
    const telegramMessage = `Ismi: ${formData.name}\nTelefon: ${formData.phone}\nKurs: ${formData.course}`

    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
        }),
      })

      if (response.ok) {
        toast.success('Xabar muvaffaqiyatli yuborildi!')
        setFormData({ name: '', phone: '', course: '' })
      } else {
        throw new Error('Xabar yuborishda xatolik')
      }
    } catch (error) {
      toast.error('Xabar yuborishda xatolik yuz berdi')
      console.error('Xatolik:', error)
    }
  }

  return (
    <div className='app'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="app__content">
        <div className="app__content-left">
          {/* Bu qismga kontent qo‘shishingiz mumkin */}
        </div>
        <div className="app__content-right">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder='ISMINGIZ'
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder='TELEFON RAQAMINGIZ'
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <select name="course" value={formData.course} onChange={handleChange} required>
              <option value="">Kursni tanlang</option>
              <option value="English">Ingliz tili</option>
              <option value="Russian">Rus tili</option>
              <option value="Korean">Koreys tili</option>
              <option value="English Kids">English Kids</option>
              <option value="SAT">SAT</option>
            </select>
            <button className='app__content-right__btn' type='submit'>
              Jo‘natish
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
