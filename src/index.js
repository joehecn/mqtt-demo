import * as mqtt from 'mqtt'
import fs from 'fs'
import path from 'path'

const ROOT_PATH = process.cwd()

const caPath = path.resolve(ROOT_PATH, 'src/certs/ca-certificate.pem')
const certPath = path.resolve(ROOT_PATH, 'src/certs/tls-certificate.pem')
const keyPath = path.resolve(ROOT_PATH, 'src/certs/tls-key.pem')

const ca = fs.readFileSync(caPath)
const cert = fs.readFileSync(certPath)
const key = fs.readFileSync(keyPath)

const options = {
  rejectUnauthorized: true,
  ca,
  cert,
  key
}

const client = mqtt.connect('mqtts://cbosv3-sandbox.cloud-building.com:1887', options)

client.on('message', msg => {
  console.log(msg)
})

client.on('connect', () => {
  console.log('connected:', client.connected)
  client.subscribe('#')
})
