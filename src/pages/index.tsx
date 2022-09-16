import styled from '@emotion/styled'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { PrimaryButton } from '@/components/buttons'
import { FormField } from '@/components/forms/FormField'
import { Input } from '@/components/forms/Input'
import { RelativeColors } from '@/styles/Colors'

const client = axios.create({
  baseURL: 'https://dev-alimtalk-api.bizmsg.kr:1443',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default function HomePage() {
  const phoneNumberInputRef = useRef<HTMLInputElement>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isVerificationCodeRequesting, setVerificationCodeRequesting] = useState(false)
  const [isVerificationCodeRequested, setVerificationCodeRequested] = useState(false)
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState<string>()

  const verificationCodeInputRef = useRef<HTMLInputElement>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setVerifying] = useState(false)
  const [isVerified, setVerified] = useState(false)
  const [verificationCodeErrorMessage, setVerificationCodeErrorMessage] = useState<string>()

  useEffect(() => {
    const savedPhoneNumber = localStorage.getItem('phoneNumber')
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber)
    }
  }, [])

  const requestVerificationCode = useCallback(async () => {
    setVerificationCodeRequesting(true)
    setPhoneNumberErrorMessage(undefined)

    localStorage.setItem('phoneNumber', phoneNumber)

    const response = await client.post('/v2/partner/test/user/token', undefined, {
      params: { phoneNumber },
    })
    if (response.data.code === 'fail') {
      setPhoneNumberErrorMessage(response.data.message)
      phoneNumberInputRef.current?.focus()
    } else if (response.data.code === 'success') {
      setVerificationCodeRequested(true)
      setTimeout(() => verificationCodeInputRef.current?.focus())
    }
    setVerificationCodeRequesting(false)
  }, [phoneNumber])

  const verifyCode = useCallback(async () => {
    setVerifying(true)
    setVerificationCodeErrorMessage(undefined)

    const response = await client.post('/v2/partner/test/user/certify', undefined, {
      params: { phoneNumber, token: verificationCode },
    })
    if (response.data.code === 'fail') {
      setVerificationCodeErrorMessage(response.data.message)
      verificationCodeInputRef.current?.focus()
    } else if (response.data.code === 'success') {
      setVerified(true)
    }
    setVerifying(false)
  }, [phoneNumber, verificationCode])

  return (
    <Container>
      <Head>
        <title>비즈엠 Devtools</title>
      </Head>
      <Main>
        <Title>비즈엠 Devtools</Title>
        <Description>
          <Link href="https://dev-admin.bizmsg.kr/" passHref><a target="blank">비즈엠 개발 서버</a></Link>에서
          알림톡을 수신하기 위한 인증 페이지입니다. 연락처를 등록한 날에만 알림톡을 받을 수 있습니다.
          카카오톡으로 수신된 인증 번호를 사용하여 테스트용 연락처를 승인합니다.
        </Description>
        <Form>
          <FormField label="전화번호">
            <Input
              ref={phoneNumberInputRef}
              placeholder="01012345678"
              value={phoneNumber}
              errorMessage={phoneNumberErrorMessage}
              onChange={(event) => {
                setPhoneNumber(event.target.value)
                setPhoneNumberErrorMessage(undefined)
                setVerificationCodeRequested(false)
              }}
            />
            <SubmitButton
              loading={isVerificationCodeRequesting}
              disabled={!phoneNumber || isVerificationCodeRequested}
              onClick={requestVerificationCode}
            >
              {!isVerificationCodeRequested ? '인증번호 받기' : '✅ 인증번호를 전송했습니다.'}
            </SubmitButton>
          </FormField>

          {isVerificationCodeRequested && (
            <FormField label="인증번호" style={{ marginTop: 40 }}>
              <Input
                ref={verificationCodeInputRef}
                placeholder="123456"
                value={verificationCode}
                errorMessage={verificationCodeErrorMessage}
                onChange={(event) => {
                  setVerificationCodeErrorMessage(undefined)
                  setVerificationCode(event.target.value)
                }}
              />
              <SubmitButton
                loading={isVerifying}
                disabled={!verificationCode || isVerified}
                onClick={verifyCode}
              >
                {!isVerified ? '인증하기' : '✅ 인증되었습니다.'}
              </SubmitButton>
            </FormField>
          )}
        </Form>
        <Footer>
          비즈엠 Devtools는 <Link href="https://indentcorp.com"><a target="_blank">인덴트코퍼레이션</a></Link>에서 비즈엠 API를 사용하여 제공하는 서비스이며, 비즈엠에서 공식적으로 제공하는 사이트가 아닙니다.
          API에 관한 자세한 내용은 <Link href="https://alimtalk-api.bizmsg.kr/startTest.html"><a target="_blank">비즈메시지 테스트 선행조건</a></Link>을 참고해 주세요.
          <Copyright>
            © 2022 <Link href="https://indentcorp.com"><a target="_blank">Indent corp.</a></Link>
          </Copyright>
        </Footer>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Main = styled.main`
  padding: 40px 20px;
  width: 100%;
  max-width: 560px;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: ${RelativeColors.gray900};
`

const Description = styled.p`
  margin-top: 24px;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: ${RelativeColors.gray600};
`

const Form = styled.div`
  margin-top: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > div:not(:first-of-type) {
    margin-top: 20px;
  }
`

const SubmitButton = styled(PrimaryButton)`
  margin-top: 16px;
`

const Footer = styled.footer`
  margin-top: 24px;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  color: ${RelativeColors.gray400};
`

const Copyright = styled.p`
  margin-top: 16px;
  a {
    color: ${RelativeColors.gray400};
  }
`
