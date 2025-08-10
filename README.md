# Mint - Tarjetas de Regalo en Blockchain 🎁

Mint es una aplicación descentralizada (dapp) que permite enviar tarjetas de regalo denominadas en USDC o XLM usando la red Stellar. Los destinatarios pueden intercambiar entre USDC y XLM instantáneamente y retirar USDC en efectivo en agencias MoneyGram.

## 🌟 Características del MVP

- **Creación de Tarjetas de Regalo**: Envía regalos en USDC o XLM
- **Integración con Freighter Wallet**: Conexión segura con la wallet de Stellar
- **Códigos QR**: Generación automática de códigos QR para compartir
- **Página de Canje**: Los destinatarios pueden canjear regalos sin wallet previa
- **Interfaz en Español**: Diseñada para la comunidad LATAM
- **Responsive Design**: Funciona en móviles y desktop

## 🚀 Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Stellar Network (Testnet)
- **Wallet**: Freighter Wallet Integration
- **QR Codes**: react-qr-code
- **Deployment**: Vercel (listo para deploy)

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Freighter Wallet extension instalado en tu navegador
- Cuenta en Stellar Testnet (puedes obtener XLM gratis del Friendbot)

## 🛠️ Instalación y Configuración

1. **Clona el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd mint-app
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura Freighter Wallet**
   - Instala la extensión [Freighter](https://www.freighter.app/)
   - Crea una cuenta en Stellar Testnet
   - Obtén XLM de prueba del [Stellar Friendbot](https://friendbot.stellar.org/)

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   - Ve a `https://localhost:3000` (HTTPS es requerido para Freighter)
   - Conecta tu wallet Freighter
   - ¡Comienza a crear tarjetas de regalo!

## 🎯 Cómo Usar la Aplicación

### Para Remitentes (Senders)

1. **Conecta tu Wallet**
   - Haz clic en "Conectar Freighter Wallet"
   - Autoriza la conexión en la extensión

2. **Crea una Tarjeta de Regalo**
   - Ingresa la cantidad y selecciona la moneda (XLM o USDC)
   - Proporciona el email del destinatario
   - Añade un mensaje personalizado (opcional)
   - Haz clic en "Crear Tarjeta de Regalo"

3. **Comparte el Regalo**
   - Copia el enlace o escanea el código QR
   - Envía por email al destinatario
   - El destinatario recibirá instrucciones para canjear

### Para Destinatarios (Recipients)

1. **Accede al Enlace**
   - Haz clic en el enlace recibido por email
   - O escanea el código QR

2. **Canjea tu Regalo**
   - Completa el formulario con tu información
   - Haz clic en "Canjear Regalo"

3. **Recibe tu Wallet**
   - Se creará automáticamente una wallet de Stellar
   - Los fondos estarán disponibles inmediatamente
   - Puedes intercambiar entre XLM y USDC

## 🔧 Estructura del Proyecto

```
mint-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal
│   │   ├── layout.tsx            # Layout principal
│   │   └── claim/[id]/page.tsx   # Página de canje
│   └── components/
│       ├── WalletConnect.tsx     # Componente de conexión wallet
│       ├── GiftCardForm.tsx      # Formulario de creación
│       ├── GiftCardDisplay.tsx   # Visualización de tarjeta
│       ├── ClaimForm.tsx         # Formulario de canje
│       └── ClaimSuccess.tsx      # Página de éxito
├── public/                       # Archivos estáticos
└── package.json                  # Dependencias y scripts
```

## 🌐 Deployment en Vercel

1. **Conecta tu repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub

2. **Configura las variables de entorno** (si es necesario)
   - En el dashboard de Vercel, ve a Settings > Environment Variables

3. **Deploy automático**
   - Cada push a main trigger un nuevo deploy
   - La aplicación estará disponible en tu dominio de Vercel

## 🎨 Personalización

### Colores y Branding
- Los colores principales están en `tailwind.config.js`
- El tema usa púrpura y azul para la marca Mint
- Puedes cambiar los colores editando las clases de Tailwind

### Textos en Español
- Todos los textos están en español para la comunidad LATAM
- Los componentes están en `src/components/`
- Edita los textos directamente en los archivos de componentes

## 🔮 Próximas Características (Futuras Iteraciones)

- **Integración con MoneyGram API**: Para retiros en efectivo
- **DEX Integration**: Intercambios automáticos entre XLM y USDC
- **Base de Datos**: Almacenamiento persistente de tarjetas
- **Email Automation**: Envío automático de emails
- **Multi-currency Support**: Más tokens de Stellar
- **Mobile App**: Aplicación nativa para iOS/Android

## 🐛 Solución de Problemas

### Error de Conexión con Freighter
- Asegúrate de que Freighter esté instalado
- Verifica que estés en HTTPS (localhost:3000)
- Revisa que la extensión esté habilitada

### Error de Transacción
- Verifica que tengas suficiente XLM en tu cuenta
- Asegúrate de estar conectado a Stellar Testnet
- Revisa la consola del navegador para errores detallados

### Problemas de Build
- Limpia la caché: `npm run build -- --clean`
- Reinstala dependencias: `rm -rf node_modules && npm install`

## 📞 Soporte

Para el hackathon de Stellar LATAM:
- **Email**: soporte@mint.com
- **Documentación**: [Stellar Docs](https://developers.stellar.org/)
- **Comunidad**: [Stellar Discord](https://discord.gg/stellarlumens)

## 📄 Licencia

Este proyecto fue creado para el **Stellar LATAM Ideathon 2024**. 

---

**¡Construido con ❤️ para la comunidad Stellar en Latinoamérica!**
