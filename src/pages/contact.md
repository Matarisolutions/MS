---
layout: default.ejs
title: Contact — Matari Solutions LLC
description: Have a question or want to partner with Matari Solutions? Send us a message and we'll get back to you.
---

<div class="breadcumb-wrapper " data-bg-src="assets/img/bg/breadcrumb-bg.png" data-overlay="smoke" data-opacity="7">
    <div class="container">
        <div class="breadcumb-content">
            <h1 class="breadcumb-title" data-cue="slideInUp">Contact Us</h1>
            <ul class="breadcumb-menu">
                <li data-cue="slideInUp" data-delay="100"><a href="index.html">Home</a></li>
                <li data-cue="slideInUp" data-delay="100">Contact Us</li>
            </ul>
        </div>
    </div>
</div>

<div class="space overflow-hidden">
    <div class="shape-mockup bg-gradient-shape1 contact-bg-gradient1" data-top="-10%" data-left="3%"></div>
    <div class="container">
        <div class="row gy-4 justify-content-center">
            <div class="col-lg-6 col-md-6">
                <div class="contact-feature" data-cue="slideInUp">
                    <div class="box-icon icon-btn"><i class="far fa-envelope"></i></div>
                    <div class="media-body"><h3 class="box-title">Email Us</h3><p class="box-text"><a href="mailto:info@matarisolutions.com">info@matarisolutions.com</a></p></div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="contact-feature" data-cue="slideInUp">
                    <div class="box-icon icon-btn"><i class="far fa-location-dot"></i></div>
                    <div class="media-body"><h3 class="box-title">Who We Serve</h3><p class="box-text">Federal, state &amp; local agencies and prime contractors nationwide.</p></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="space-bottom overflow-hidden" id="contact-sec">
    <div class="shape-mockup bg-gradient-shape1 contact-bg-gradient1" data-top="auto" data-bottom="25%" data-right="3%" data-left="auto"></div>
    <div class="container">
        <div class="title-area text-center">
            <span class="sub-title" data-cue="slideInUp">Get in Touch</span>
            <h2 class="sec-title" data-cue="slideInUp">Have a question or want to partner with us?</h2>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-8">
                <div class="contact-form1" data-cue="slideInUp">
                    <h2 class="contact-form-title mb-30">Send Us a Message</h2>
                    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="thankyou.html" class="input-label">
                        <input type="hidden" name="form-name" value="contact">
                        <p class="d-none"><label>Don't fill this out: <input name="bot-field"></label></p>
                        <div class="row">
                            <div class="form-group col-sm-6"><input type="text" class="form-control" placeholder="Full Name" name="name" id="name" required=""><i class="far fa-user text-theme"></i></div>
                            <div class="form-group col-sm-6"><input type="email" class="form-control" placeholder="Email Address" name="email" id="email" required=""><i class="far fa-envelope text-theme"></i></div>
                            <div class="form-group col-12"><input type="text" class="form-control" placeholder="Agency / Organization" name="organization" id="organization"><i class="far fa-building text-theme"></i></div>
                            <div class="form-group col-12"><textarea name="message" id="message" cols="30" placeholder="Your Message" rows="3" class="form-control" required=""></textarea></div>
                            <div class="form-btn col-12 mt-10"><button type="submit" class="ot-btn w-100">Submit Inquiry <i class="far fa-long-arrow-right ms-2"></i></button></div>
                        </div>
                        <p class="form-messages mb-0 mt-3"></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
